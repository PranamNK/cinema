import Skeleton from '@/components/ui/Skeleton/Skeleton';

export default function Loading() {
    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            <Skeleton height="500px" borderRadius="var(--radius-lg)" style={{ marginBottom: '2rem' }} />
            <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
                <Skeleton width="300px" height="450px" borderRadius="var(--radius-md)" />
                <div style={{ flex: 1 }}>
                    <Skeleton height="40px" width="60%" style={{ marginBottom: '1rem' }} />
                    <Skeleton height="20px" width="40%" style={{ marginBottom: '2rem' }} />
                    <Skeleton height="150px" borderRadius="var(--radius-md)" />
                </div>
            </div>
        </div>
    );
}
