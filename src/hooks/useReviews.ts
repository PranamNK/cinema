import { useState, useEffect } from 'react';
import { Review } from '@/types';

const REVIEWS_KEY = 'movie_app_reviews';

export function useReviews(movieId: number) {
    const [reviews, setReviews] = useState<Review[]>([]);

    useEffect(() => {
        // Load all reviews, filter for this movie
        const stored = localStorage.getItem(REVIEWS_KEY);
        if (stored) {
            try {
                const allReviews: Record<number, Review[]> = JSON.parse(stored);
                setReviews(allReviews[movieId] || []);
            } catch (e) {
                console.error("Failed to parse reviews", e);
            }
        }
    }, [movieId]);

    const addReview = (review: Omit<Review, 'id' | 'createdAt' | 'movieId'>) => {
        const newReview: Review = {
            ...review,
            id: crypto.randomUUID(),
            movieId,
            createdAt: new Date().toISOString(),
        };

        setReviews(prev => {
            const updated = [newReview, ...prev];

            // Persist
            const stored = localStorage.getItem(REVIEWS_KEY);
            let allReviews: Record<number, Review[]> = {};
            if (stored) {
                try {
                    allReviews = JSON.parse(stored);
                } catch { }
            }
            allReviews[movieId] = updated;
            localStorage.setItem(REVIEWS_KEY, JSON.stringify(allReviews));

            return updated;
        });
    };

    return { reviews, addReview };
}
