"use client";
import React from 'react';
import Image from 'next/image';
import { Movie } from '@/types';
import { getImageUrl } from '@/utils/api';
import Button from '@/components/ui/Button/Button';
import { useFavorites } from '@/context/FavoritesContext';
import { Play, Heart } from 'lucide-react';
import TrailerModal from '@/components/ui/TrailerModal/TrailerModal';
import ReviewSection from '@/components/movies/ReviewSection/ReviewSection';
import { useHistory } from '@/hooks/useHistory';
import styles from './MovieDetails.module.css';

export default function MovieDetails({ movie }: { movie: Movie }) {
    const { isFavorite, addFavorite, removeFavorite } = useFavorites();
    const [showTrailer, setShowTrailer] = React.useState(false);
    const { addToHistory } = useHistory();
    const favorite = isFavorite(movie.id);

    React.useEffect(() => {
        window.scrollTo(0, 0);
        addToHistory(movie);
    }, [movie]);

    const toggleFavorite = () => {
        if (favorite) removeFavorite(movie.id);
        else addFavorite(movie);
    };

    const trailer = movie.videos?.results?.find(
        vid => vid.site === 'YouTube' && (vid.type === 'Trailer' || vid.type === 'Teaser')
    );

    return (
        <div className={styles.container}>
            {/* Background Backdrop */}
            <div className={styles.backdrop}>
                <Image
                    src={getImageUrl(movie.backdrop_path || movie.poster_path, 'original')}
                    alt="Backdrop"
                    fill
                    className={styles.backdropImage}
                    priority
                />
                <div className={styles.overlay} />
            </div>

            <div className={styles.mainContent}>
                <div className={styles.grid}>
                    {/* Poster Column */}
                    <div className={styles.posterCol}>
                        <div className={styles.glassPanel}>
                            <Image
                                src={getImageUrl(movie.poster_path, 'original')}
                                alt={movie.title}
                                width={400}
                                height={600}
                                className={styles.poster}
                                priority
                            />
                        </div>
                    </div>

                    {/* Info Column */}
                    <div className={styles.infoCol}>
                        <h1 className={styles.title}>{movie.title}</h1>

                        <div className={styles.metaRow}>
                            <span className={styles.ratingBadge}>
                                ★ {movie.vote_average?.toFixed(1)}
                            </span>
                            <span className={styles.metaItem}>{movie.release_date?.split('-')[0]}</span>
                            <span className={styles.metaItem}>
                                {movie.runtime ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m` : ''}
                            </span>
                        </div>

                        <div className={styles.genres}>
                            {movie.genres?.map(g => (
                                <span key={g.id} className={styles.genreTag}>{g.name}</span>
                            ))}
                        </div>

                        <p className={styles.tagline}>{/* Tagline if available in type, else skip */}</p>
                        <p className={styles.overview}>{movie.overview}</p>

                        <div className={styles.actions}>
                            {trailer && (
                                <Button
                                    variant="primary"
                                    onClick={() => setShowTrailer(true)}
                                    className={styles.playBtn}
                                >
                                    <Play fill="currentColor" size={20} /> Watch Trailer
                                </Button>
                            )}
                            <Button
                                onClick={toggleFavorite}
                                className={`${styles.favBtn} ${favorite ? styles.active : ''}`}
                            >
                                <Heart
                                    size={20}
                                    fill={favorite ? "currentColor" : "none"}
                                    strokeWidth={2.5}
                                />
                                {favorite ? 'Saved' : 'Add to Favorites'}
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Cast Section */}
                {movie.credits?.cast && movie.credits.cast.length > 0 && (
                    <div className={styles.castSection}>
                        <h3 className={styles.sectionTitle}>Top Cast</h3>
                        <div className={styles.castGrid}>
                            {movie.credits.cast.slice(0, 8).map(actor => (
                                <div key={actor.id} className={styles.actorCard}>
                                    <div className={styles.actorImageWrapper}>
                                        <Image
                                            src={getImageUrl(actor.profile_path)}
                                            alt={actor.name}
                                            fill
                                            className={styles.actorImage}
                                        />
                                    </div>
                                    <div className={styles.actorInfo}>
                                        <span className={styles.actorName}>{actor.name}</span>
                                        <span className={styles.character}>{actor.character}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <ReviewSection movieId={movie.id} />
            </div>

            {showTrailer && trailer && (
                <TrailerModal
                    videoKey={trailer.key}
                    onClose={() => setShowTrailer(false)}
                />
            )}
        </div>
    );
}
