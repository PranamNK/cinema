export interface Movie {
    id: number;
    title: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    vote_average: number;
    overview: string;
    genre_ids?: number[];
    genres?: { id: number; name: string }[]; // localized in details
    runtime?: number; // details only
    credits?: {
        cast: Actor[];
        crew: Crew[];
    };
    videos?: {
        results: Video[];
    };
}

export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
}

export interface Actor {
    id: number;
    name: string;
    character: string;
    profile_path: string | null;
}

export interface Crew {
    id: number;
    name: string;
    job: string;
}

export interface MovieResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
}

export interface Genre {
    id: number;
    name: string;
}

export interface GenreResponse {
    genres: Genre[];
}

export interface Review {
    id: string;
    movieId: number;
    rating: number; // 1-10 or 1-5
    content: string;
    createdAt: string;
    author: string;
}
