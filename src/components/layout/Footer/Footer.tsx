import Link from 'next/link';
import { Twitter, Instagram, Github, Youtube, Mail } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <div className={styles.row}>
                    {/* Brand Column */}
                    <div className={styles.col}>
                        <h3 className={styles.brand}>Cenima</h3>
                        <p className={styles.tagline}>
                            Your ultimate destination for cinematic discovery.
                            Curated lists, trending hits, and hidden gems.
                        </p>
                    </div>

                    {/* Links Column */}
                    <div className={styles.col}>
                        <h4 className={styles.heading}>Explore</h4>
                        <ul className={styles.links}>
                            <li><Link href="/">Home</Link></li>
                            <li><Link href="/">Trending</Link></li>
                            <li><Link href="/">New Releases</Link></li>
                            <li><Link href="/">Popular</Link></li>
                        </ul>
                    </div>

                    {/* Legal/Info Column */}
                    <div className={styles.col}>
                        <h4 className={styles.heading}>Info</h4>
                        <ul className={styles.links}>
                            <li><Link href="/">About Us</Link></li>
                            <li><Link href="/">Contact</Link></li>
                            <li><Link href="/">Terms of Service</Link></li>
                            <li><Link href="/">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Socials Column */}
                    <div className={styles.col}>
                        <h4 className={styles.heading}>Connect</h4>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Twitter size={20} /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Instagram size={20} /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Youtube size={20} /></a>
                        <a href="https://github.com/PranamNK/cinema" target="_blank" rel="noopener noreferrer" className={styles.socialLink}><Github size={20} /></a>
                    </div>
                    <div className={styles.newsletter}>
                        <p>Stay updated</p>
                        <div className={styles.inputGroup}>
                            <input type="email" placeholder="Email address" />
                            <button><Mail size={16} /></button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.bottom}>
                <p>&copy; {new Date().getFullYear()} Cenima Movie App. All rights reserved.</p>
            </div>
        </div>
        </footer >
    );
}
