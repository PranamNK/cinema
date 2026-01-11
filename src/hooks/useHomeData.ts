import { useState, useEffect } from 'react';
import { getTrendingMovies, getTopRatedMovies, getUpcomingMovies, getPopularMovies } from '@/utils/api';
import { Movie } from '@/types';

export function useHomeData() {
    const [trending, setTrending] = useState<Movie[]>([]);
    const [popular, setPopular] = useState<Movie[]>([]);
    const [topRated, setTopRated] = useState<Movie[]>([]);
    const [upcoming, setUpcoming] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAll = async () => {
            try {
                const [trendData, popData, topData, upData] = await Promise.all([
                    getTrendingMovies(),
                    getPopularMovies(),
                    getTopRatedMovies(),
                    getUpcomingMovies()
                ]);

                setTrending(trendData.results);
                setPopular(popData.results);
                setTopRated(topData.results);
                setUpcoming(upData.results);
            } catch (e) {
                console.error("Failed to fetch home data", e);
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    return { trending, popular, topRated, upcoming, loading };
}
