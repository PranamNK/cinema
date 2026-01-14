import { getMovieDetailsServer } from '@/lib/tmdb';
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
            </div>
        );
    }

    return <MovieDetails movie={movie} />;
}
