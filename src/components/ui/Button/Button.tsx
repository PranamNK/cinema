import React from 'react';
import styles from './Button.module.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'icon' | 'favorites';
    isActive?: boolean; // For favorite toggle
}

export default function Button({
    children,
    className = '',
    variant,
    isActive,
    ...props
}: ButtonProps) {
    const variantClass = variant ? styles[variant] : '';
    const activeClass = isActive ? styles.active : '';

    return (
        <button
            className={`${styles.button} ${variantClass} ${activeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
}
