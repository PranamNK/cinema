import React, { useEffect, useState } from 'react';
import { discoverMovies } from '@/utils/api';
import { Movie } from '@/types';
import MovieRow from '../MovieRow/MovieRow';

interface AsyncMovieRowProps {
    title: string;
    genreId: number;
}

export default function AsyncMovieRow({ title, genreId }: AsyncMovieRowProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const res = await discoverMovies(1, genreId);
                if (isMounted) {
                    setMovies(res.results);
                }
            } catch (error) {
                console.error("Failed to fetch genre movies", error);
            } finally {
                if (isMounted) setLoading(false);
            }
        };
        fetchData();
        return () => { isMounted = false; };
    }, [genreId]);

    if (loading) return null; // Or render skeleton
    if (movies.length === 0) return null;

    return <MovieRow title={title} movies={movies} />;
}
