"use client";
import React, { useState } from 'react';
import { useReviews } from '@/hooks/useReviews';
import { z } from 'zod';
import styles from './ReviewSection.module.css';

export default function ReviewSection({ movieId }: { movieId: number }) {
    const { reviews, addReview } = useReviews(movieId);
    const [author, setAuthor] = useState('');
    const [content, setContent] = useState('');
    const [rating, setRating] = useState(5);

    const [isWriting, setIsWriting] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Zod Validation
        try {
            const ReviewSchema = z.object({
                author: z.string().min(2, "Name too short").max(50, "Name too long"),
                content: z.string().min(5, "Review too short").max(500, "Review too long"),
                rating: z.number().min(1).max(5)
            });

            ReviewSchema.parse({ author, content, rating });
        } catch (error) {
            console.error("Validation failed", error);
            alert("Invalid input: Please check your name and review.");
            return;
        }

        if (!author.trim() || !content.trim()) return;

        addReview({
            author, // React ensures basic XSS protection
            content,
            rating,
        });

        setAuthor('');
        setContent('');
        setRating(5);
        setIsWriting(false);
    };

    return (
        <div className={styles.section}>
            <h3 className={styles.title}>User Reviews</h3>

            {/* Collapsible Form */}
            {!isWriting ? (
                <button
                    className={styles.writeReviewBtn}
                    onClick={() => setIsWriting(true)}
                >
                    Write a Review...
                </button>
            ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.row}>
                        <div className={`${styles.inputGroup} ${styles.nameInput}`}>
                            <label className={styles.label}>Name</label>
                            <input
                                className={styles.textInput}
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Your Name"
                                autoFocus
                            />
                        </div>

                        <div className={styles.inputGroup}>
                            <label className={styles.label}>Rating</label>
                            <div className={styles.starInput}>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className={`${styles.starBtn} ${rating >= star ? styles.starFilled : ''}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className={styles.inputGroup}>
                        <textarea
                            className={styles.textArea}
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Share your thoughts..."
                        />
                    </div>

                    <div className={styles.actions}>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => setIsWriting(false)}
                        >
                            Cancel
                        </button>
                        <button type="submit" className={styles.submitBtn}>
                            Post
                        </button>
                    </div>
                </form>
            )}

            {/* List */}
            <div className={styles.reviewsList}>
                {reviews.length === 0 ? (
                    <p className={styles.empty}>No reviews yet. Be the first to add one!</p>
                ) : (
                    reviews.map(review => (
                        <div key={review.id} className={styles.reviewCard}>
                            <div className={styles.reviewHeader}>
                                <span className={styles.author}>{review.author}</span>
                                <span className={styles.date}>{new Date(review.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className={styles.stars}>
                                {'★'.repeat(Math.min(5, Math.max(0, review.rating)))}
                                {'☆'.repeat(Math.max(0, 5 - review.rating))}
                            </div>
                            <p className={styles.content}>{review.content}</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
