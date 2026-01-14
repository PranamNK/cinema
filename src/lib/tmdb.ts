import { Movie } from '@/types';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = process.env.TMDB_API_KEY || process.env.NEXT_PUBLIC_TMDB_API_KEY;

export async function getMovieDetailsServer(id: string): Promise<Movie | null> {
    if (!API_KEY) {
        console.error('TMDB API Key missing on server');
        return null;
    }

    try {
        const sanitizedKey = API_KEY.trim();
        const res = await fetch(`${BASE_URL}/movie/${id}?api_key=${sanitizedKey}&append_to_response=credits,videos`, {
            cache: 'no-store'
        });

        if (!res.ok) {
            console.error(`TMDB Error: ${res.status} ${res.statusText}`);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('Failed to fetch movie details on server:', error);
        return null;
    }
}
