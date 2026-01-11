import React from 'react';
import { Search } from 'lucide-react';
import styles from './Input.module.css';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    // extensions
}

export default function Input({ className = '', ...props }: InputProps) {
    return (
        <div className={styles.inputWrapper}>
            <input className={`${styles.input} ${className}`} {...props} />
            <button className={styles.searchBtn}>
                <Search size={22} className={styles.searchIcon} />
            </button>
        </div>
    );
}
