import { getMovieDetailsServer } from '@/lib/tmdb';
import Link from 'next/link';
import MovieDetails from '@/components/movies/MovieDetails/MovieDetails';

interface PageProps {
    params: Promise<{ id: string }>;
}

export default async function Page({ params }: PageProps) {
    const { id } = await params;
    let movie = null;

    try {
        movie = await getMovieDetailsServer(id);
    } catch (e) {
        console.error(e);
    }

    if (!movie) {
        return (
            <div style={{ textAlign: 'center', padding: '4rem' }}>
                <h1>Movie Not Found</h1>
                <p style={{ marginTop: '1rem', color: '#888' }}>
                    Movie ID: {id}<br />
                    Server Environment Check:<br />
                    TMDB_API_KEY Available: {process.env.TMDB_API_KEY ? 'Yes' : 'No'}<br />
                    NEXT_PUBLIC_TMDB_API_KEY Available: {process.env.NEXT_PUBLIC_TMDB_API_KEY ? 'Yes' : 'No'}
                </p>
                <Link href="/" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'underline' }}>
                    Return Home
                </Link>
            </div>
        );
    }

    return <MovieDetails movie={movie} />;
}
