import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import styles from './TrailerModal.module.css';

interface TrailerModalProps {
    videoKey: string;
    onClose: () => void;
}

export default function TrailerModal({ videoKey, onClose }: TrailerModalProps) {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    if (!videoKey) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <button className={styles.closeBtn} onClick={onClose} aria-label="Close trailer">
                    <X size={24} />
                </button>
                <div className={styles.videoWrapper}>
                    <iframe
                        src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
                        title="Movie Trailer"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className={styles.iframe}
                    />
                </div>
            </div>
        </div>
    );
}
