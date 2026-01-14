/* eslint-disable */
"use client";
import React, { useRef, useEffect, useState } from 'react';

export default function VantaBackground() {
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    useEffect(() => {
        // Prevent double init
        if (vantaEffect) return;

        const loadScript = (src: string) => {
            return new Promise((resolve, reject) => {
                if (document.querySelector(`script[src="${src}"]`)) {
                    resolve(true);
                    return;
                }
                const script = document.createElement('script');
                script.src = src;
                script.async = true;
                script.onload = () => resolve(true);
                script.onerror = () => reject(new Error(`Failed to load ${src}`));
                document.body.appendChild(script);
            });
        };

        const initVanta = async () => {
            try {
                if (!(window as any).THREE) {
                    await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
                }

                // Wait for THREE to be available
                let attempts = 0;
                while (!(window as any).THREE && attempts < 20) {
                    await new Promise(r => setTimeout(r, 100));
                    attempts++;
                }

                if (!(window as any).VANTA || !(window as any).VANTA.NET) {
                    await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js');
                }

                if ((window as any).VANTA && (window as any).VANTA.NET && vantaRef.current && (window as any).THREE) {
                    const effect = (window as any).VANTA.NET({
                        el: vantaRef.current,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        scaleMobile: 1.00,
                        color: 0xa41414,
                        backgroundColor: 0x0,
                        points: 12.00,
                        maxDistance: 22.00,
                        spacing: 18.00
                    });
                    setVantaEffect(effect);
                    console.log("Vanta NET Initialized Successfully!");
                }
            } catch (error) {
                console.error("Vanta Script Load Error:", error);
            }
        };

        initVanta();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, []); // Empty dependency array -> run once on mount

    return (
        <div
            ref={vantaRef}
            id="vanta-bg"
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }}
        />
    );
}
