import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

// Load .env.local manually
const envPath = path.resolve(process.cwd(), '.env.local');
const envConfig = dotenv.parse(fs.readFileSync(envPath));
const API_KEY = envConfig.NEXT_PUBLIC_TMDB_API_KEY;

console.log('API Key present:', !!API_KEY);

if (!API_KEY) {
    console.error('No API Key found in .env.local');
    process.exit(1);
}

const BASE_URL = 'https://api.themoviedb.org/3';
const MOVIE_ID = '550'; // Fight Club

async function testMovieFetch() {
    const url = `${BASE_URL}/movie/${MOVIE_ID}?api_key=${API_KEY}`;
    console.log(`Fetching: ${BASE_URL}/movie/${MOVIE_ID}?api_key=HIDDEN`);

    try {
        const res = await fetch(url);
        if (!res.ok) {
            console.error(`Error: ${res.status} ${res.statusText}`);
            const text = await res.text();
            console.error(text);
        } else {
            const data = await res.json();
            console.log('Success! Movie Title:', data.title);
        }
    } catch (e) {
        console.error('Fetch failed:', e);
    }
}

testMovieFetch();
