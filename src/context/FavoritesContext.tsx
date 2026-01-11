"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Movie } from '@/types';

interface FavoritesContextType {
    favorites: Movie[];
    addFavorite: (movie: Movie) => void;
    removeFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
    const [favorites, setFavorites] = useState<Movie[]>([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('favorites');
        if (stored) {
            try {
                setFavorites(JSON.parse(stored));
            } catch (e) {
                console.error("Failed to parse favorites", e);
            }
        }
        setLoaded(true);
    }, []);

    const addFavorite = (movie: Movie) => {
        if (isFavorite(movie.id)) return;
        const newFavs = [...favorites, movie];
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    const removeFavorite = (id: number) => {
        const newFavs = favorites.filter(m => m.id !== id);
        setFavorites(newFavs);
        localStorage.setItem('favorites', JSON.stringify(newFavs));
    };

    const isFavorite = (id: number) => {
        return favorites.some(m => m.id === id);
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
}
