
import { NextRequest, NextResponse } from 'next/server';
import rateLimit from '@/lib/rate-limit';
import { z } from 'zod';

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

// Validation Schema for Search
const SearchSchema = z.object({
    query: z.string().max(100).regex(/^[a-zA-Z0-9\s\-_.,?!]+$/).optional(),
    page: z.string().regex(/^\d+$/).optional(),
});

export async function GET(req: NextRequest, { params }: { params: Promise<{ path: string[] }> }) {
    if (!API_KEY) {
        return NextResponse.json({ error: 'Server misconfiguration: API/Key missing' }, { status: 500 });
    }

    // 1. Rate Limiting
    const ip = req.headers.get('x-forwarded-for') || 'Anonymous';
    try {
        await limiter.check(50, ip); // 50 requests per minute per IP
    } catch {
        return NextResponse.json({ error: 'Rate limit exceeded' }, { status: 429 });
    }

    const { path } = await params;
    const endpoint = path.join('/');
    const url = new URL(req.url);
    const searchParams = url.searchParams;

    // 2. Input Validation (Sanatization)
    try {
        SearchSchema.parse({
            query: searchParams.get('query') || undefined,
            page: searchParams.get('page') || undefined
        });
    } catch {
        return NextResponse.json({ error: 'Invalid input parameters' }, { status: 400 });
    }

    // Construct TMDB URL
    // We strictly forward only specific params to prevent injection
    const tmdbParams = new URLSearchParams();
    tmdbParams.append('api_key', API_KEY);

    // Whitelist allowed params
    ['page', 'query', 'sort_by', 'with_genres', 'append_to_response'].forEach(key => {
        const val = searchParams.get(key);
        if (val) tmdbParams.append(key, val);
    });

    try {
        const res = await fetch(`${BASE_URL}/${endpoint}?${tmdbParams.toString()}`, {
            headers: { 'Content-Type': 'application/json' },
            next: { revalidate: 3600 }
        });

        if (!res.ok) {
            return NextResponse.json(
                { error: `TMDB Error: ${res.statusText}` },
                { status: res.status }
            );
        }

        const data = await res.json();
        return NextResponse.json(data);
    } catch (error) {
        console.error("Proxy Error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
