import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import MovieCard from '@/components/movies/MovieCard/MovieCard';
import { Movie } from '@/types';
import styles from './MovieRow.module.css';

interface MovieRowProps {
    title: string;
    movies: Movie[];
    linkUrl?: string;
}

export default function MovieRow({ title, movies, linkUrl }: MovieRowProps) {
    if (!movies || movies.length === 0) return null;

    return (
        <section className={styles.rowSection}>
            <div className={styles.header}>
                <h2 className={styles.title}>{title}</h2>
                {linkUrl && (
                    <Link href={linkUrl} className={styles.viewAll}>
                        View All <ArrowRight size={16} />
                    </Link>
                )}
            </div>

            <div className={styles.carousel}>
                {movies.map(movie => (
                    <div key={movie.id} className={styles.cardWrapper}>
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>
        </section>
    );
}
