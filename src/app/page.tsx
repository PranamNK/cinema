"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Input from '@/components/ui/Input/Input';
import HeroSection from '@/components/layout/HeroSection/HeroSection';
import MovieRow from '@/components/movies/MovieRow/MovieRow';
import MovieCard from '@/components/movies/MovieCard/MovieCard';
import Skeleton from '@/components/ui/Skeleton/Skeleton';
import FilterBar from '@/components/movies/FilterBar/FilterBar';
import Button from '@/components/ui/Button/Button';
import VantaBackground from '@/components/ui/VantaBackground/VantaBackground';
import AsyncMovieRow from '@/components/movies/AsyncMovieRow/AsyncMovieRow';
import Footer from '@/components/layout/Footer/Footer';

import { useMovies } from '@/hooks/useMovies';
import { useHomeData } from '@/hooks/useHomeData';
import { useDebounce } from '@/hooks/useDebounce';
import { useHistory } from '@/hooks/useHistory';
import { getGenres } from '@/utils/api';

import styles from './page.module.css';

export default function Home() {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<number | undefined>(undefined);
  const [page, setPage] = useState(1);

  // New State for Categories
  const [allGenres, setAllGenres] = useState<{ id: number; name: string }[]>([]);
  const [displayedGenres, setDisplayedGenres] = useState<{ id: number; name: string }[]>([]);
  const [genresLoading, setGenresLoading] = useState(false);

  const debouncedQuery = useDebounce(query, 500);
  const { history } = useHistory();

  // Search or Filter state
  const { movies: searchResults, loading: searchLoading, hasMore: searchHasMore } = useMovies(debouncedQuery, page, selectedGenre);

  // Home data state
  const { trending, popular, topRated, upcoming, loading: homeLoading } = useHomeData();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setPage(1); // Reset page on new search
  };

  const handleGenreSelect = (id: number | undefined) => {
    setSelectedGenre(id);
    setQuery(''); // Clear search if genre selected
    setPage(1);
  };

  const loadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleLoadMoreCategories = async () => {
    setGenresLoading(true);
    try {
      let genres = allGenres;
      if (genres.length === 0) {
        const res = await getGenres();
        genres = res.genres;
        setAllGenres(genres);
      }

      const currentLength = displayedGenres.length;
      const nextBatch = genres.slice(currentLength, currentLength + 3); // Load 3 at a time
      setDisplayedGenres(prev => [...prev, ...nextBatch]);
    } catch (err) {
      console.error(err);
    } finally {
      setGenresLoading(false);
    }
  };

  const isFiltering = debouncedQuery || selectedGenre;

  return (
    <div className={styles.mainWrapper}>
      <VantaBackground />
      <HeroSection>
        <Input
          placeholder="Find Your Next Obsession"
          value={query}
          onChange={handleSearch}
          className={styles.searchBar}
          autoFocus={false}
        />
        <FilterBar selectedGenre={selectedGenre} onSelectGenre={handleGenreSelect} />
      </HeroSection>

      {/* Show Search or Filter Results */}
      {isFiltering ? (
        <div className={styles.container}>
          <h2 className={styles.sectionTitle}>
            {selectedGenre ? 'Category Results' : 'Search Results'}
          </h2>
          {searchLoading && page === 1 && (
            <div className={styles.grid}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={`skeleton-${i}`} style={{ aspectRatio: '16/9' }}>
                  <Skeleton height="100%" borderRadius="12px" />
                </div>
              ))}
            </div>
          )}

          <div className={styles.grid}>
            {searchResults.map((movie, index) => (
              <div
                key={movie.id}
                className={styles.fadeIn}
                style={{ animationDelay: `${index * 50}ms` } as React.CSSProperties}
              >
                <MovieCard movie={movie} />
              </div>
            ))}
          </div>

          {!searchLoading && searchResults.length === 0 && (
            <div className={styles.empty}>No movies found.</div>
          )}

          {searchHasMore && !searchLoading && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <Button variant="primary" onClick={loadMore}>Load More</Button>
            </div>
          )}
        </div>
      ) : (
        /* Show Home Rows if No Search */
        <div className={styles.rowsContainer}>
          {homeLoading ? (
            <div style={{ padding: '2rem' }}>
              <Skeleton height="300px" width="100%" borderRadius="var(--radius-lg)" />
            </div>
          ) : (
            <>
              {history.length > 0 && <MovieRow title="Recently Viewed" movies={history} />}
              <MovieRow title="Trending Now" movies={trending} />
              <MovieRow title="Top Rated" movies={topRated} />
              <MovieRow title="Upcoming Releases" movies={upcoming} />
              <MovieRow title="Popular" movies={popular} />

              {displayedGenres.map(genre => (
                <AsyncMovieRow key={genre.id} title={`${genre.name} Movies`} genreId={genre.id} />
              ))}

              <div style={{ textAlign: 'center', marginTop: '4rem', marginBottom: '2rem' }}>
                <Button
                  onClick={handleLoadMoreCategories}
                  disabled={genresLoading}
                  style={{ border: '1px solid rgba(255,255,255,0.2)', padding: '1rem 3rem' }}
                >
                  {genresLoading ? 'Loading...' : 'Load More Categories'}
                </Button>
              </div>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}
