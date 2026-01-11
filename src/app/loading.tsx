import Skeleton from '@/components/ui/Skeleton/Skeleton';
import styles from './page.module.css';

export default function Loading() {
    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <Skeleton height="50px" borderRadius="var(--radius-full)" className={styles.searchBar} />
            </header>
            <div className={styles.grid}>
                {Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} style={{ aspectRatio: '2/3' }}>
                        <Skeleton height="100%" borderRadius="var(--radius-md)" />
                    </div>
                ))}
            </div>
        </div>
    );
}
