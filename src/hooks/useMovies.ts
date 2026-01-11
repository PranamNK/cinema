import { useState, useEffect, useRef } from 'react';
import { searchMovies, getPopularMovies, discoverMovies } from '@/utils/api';
import { Movie } from '@/types';

export function useMovies(query: string, page: number, genreId?: number) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMore, setHasMore] = useState(true);

    // Reset movies when query or genre changes
    useEffect(() => {
        setMovies([]);
        setHasMore(true);
    }, [query, genreId]);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            setError(null);
            try {
                let data;
                if (query) {
                    data = await searchMovies(query, page);
                } else if (genreId) {
                    data = await discoverMovies(page, genreId);
                } else {
                    data = await getPopularMovies(page);
                }

                setMovies(prev => {
                    // If page 1, replace. If page > 1, append.
                    // But since we reset on query change, we need to be careful with the effect dependency.
                    if (page === 1) return data.results;

                    // Deduplicate based on ID just in case
                    const newMovies = data.results.filter(
                        newMovie => !prev.some(existing => existing.id === newMovie.id)
                    );
                    return [...prev, ...newMovies];
                });

                setHasMore(data.page < data.total_pages);
            } catch (err) {
                console.error(err);
                setError('Failed to fetch movies');
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, [query, page, genreId]);

    return { movies, loading, error, hasMore };
}
