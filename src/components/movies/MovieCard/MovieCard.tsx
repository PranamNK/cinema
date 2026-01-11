"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import Card from '@/components/ui/Card/Card';
import Button from '@/components/ui/Button/Button';
import { Movie } from '@/types';
import { getImageUrl } from '@/utils/api';
import { useFavorites } from '@/context/FavoritesContext';
import styles from './MovieCard.module.css';

export default function MovieCard({ movie }: { movie: Movie }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const favorite = isFavorite(movie.id);

    const toggleFavorite = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (favorite) removeFavorite(movie.id);
        else addFavorite(movie);
    };

    return (
        <Link href={`/movie/${movie.id}`}>
            <Card className={styles.movieCard}>
                <div className={styles.posterWrapper}>
                    <Image
                        src={getImageUrl(movie.backdrop_path || movie.poster_path)}
                        alt={movie.title}
                        fill
                        className={styles.poster}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                </div>
                <div className={styles.info}>
                    <div className={styles.header}>
                        <h3 className={styles.title}>{movie.title}</h3>
                        <span className={styles.rating}>{(movie.vote_average || 0).toFixed(1)}</span>
                    </div>
                    <div className={styles.meta}>
                        <span>{movie.release_date?.split('-')[0] || 'N/A'}</span>
                        <Button
                            variant="favorites"
                            isActive={favorite}
                            onClick={toggleFavorite}
                            className={styles.favBtn}
                            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <Heart
                                size={20}
                                fill={favorite ? "currentColor" : "none"}
                                stroke="currentColor"
                                strokeWidth={2.5}
                            />
                        </Button>
                    </div>
                </div>
            </Card>
        </Link>
    );
}
