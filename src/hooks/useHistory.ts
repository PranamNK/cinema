import { useState, useEffect } from 'react';
import { Movie } from '@/types';

const HISTORY_KEY = 'movie_app_history';

export function useHistory() {
    const [history, setHistory] = useState<Movie[]>([]);

    useEffect(() => {
        // Load on mount
        const stored = localStorage.getItem(HISTORY_KEY);
        if (stored) {
            try {
                setHistory(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse history", e);
            }
        }
    }, []);

    const addToHistory = (movie: Movie) => {
        setHistory(prev => {
            // Remove if exists, then add to front
            const filtered = prev.filter(m => m.id !== movie.id);
            const updated = [movie, ...filtered].slice(0, 10); // Keep last 10
            localStorage.setItem(HISTORY_KEY, JSON.stringify(updated));
            return updated;
        });
    };

    const clearHistory = () => {
        setHistory([]);
        localStorage.removeItem(HISTORY_KEY);
    };

    return { history, addToHistory, clearHistory };
}
