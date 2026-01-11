import { Movie, MovieResponse } from '@/types';

const BASE_URL = '/api/movies';

async function fetchTMDB<T>(endpoint: string, params: Record<string, string> = {}): Promise<T> {
    const query = new URLSearchParams(params).toString();
    const url = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

    const res = await fetch(`${BASE_URL}/${url}?${query}`, {
        headers: {
            'Content-Type': 'application/json',
        },
        next: { revalidate: 3600 },
    });

    if (!res.ok) {
        throw new Error(`API Error: ${res.statusText}`);
    }

    return res.json();
}

export const searchMovies = async (query: string, page = 1): Promise<MovieResponse> => {
    if (!query) return { page: 1, results: [], total_pages: 0, total_results: 0 };
    return fetchTMDB<MovieResponse>('/search/movie', { query, page: page.toString() });
};

export const getPopularMovies = async (page = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/movie/popular', { page: page.toString() });
};

export const getTrendingMovies = async (): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/trending/movie/day');
};

export const getTopRatedMovies = async (page = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/movie/top_rated', { page: page.toString() });
};

export const getUpcomingMovies = async (page = 1): Promise<MovieResponse> => {
    return fetchTMDB<MovieResponse>('/movie/upcoming', { page: page.toString() });
};

export const getMovieDetails = async (id: string): Promise<Movie> => {
    return fetchTMDB<Movie>(`/movie/${id}`, { append_to_response: 'credits,videos' });
};

export const getImageUrl = (path: string | null, size: 'w500' | 'original' = 'w500') => {
    if (!path) return '/placeholder.png'; // Need a placeholder
    return `https://image.tmdb.org/t/p/${size}${path}`;
};

export const getGenres = async (): Promise<{ genres: { id: number; name: string }[] }> => {
    return fetchTMDB<{ genres: { id: number; name: string }[] }>('/genre/movie/list');
};

export const discoverMovies = async (page = 1, genreId?: number): Promise<MovieResponse> => {
    const params: Record<string, string> = {
        page: page.toString(),
        sort_by: 'popularity.desc'
    };
    if (genreId) {
        params.with_genres = genreId.toString();
    }
    return fetchTMDB<MovieResponse>('/discover/movie', params);
};
