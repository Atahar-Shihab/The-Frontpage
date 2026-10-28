"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Seeded PRNG: same output on server and client (no hydration mismatch, no impure render calls)
function mulberry32(seed) {
    let a = seed;
    return function () {
        a |= 0;
        a = (a + 0x6d2b79f5) | 0;
        let t = Math.imul(a ^ (a >>> 15), 1 | a);
        t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
        return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
}

const rand = mulberry32(404);

const STARS = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    top: +(rand() * 100).toFixed(2),
    left: +(rand() * 100).toFixed(2),
    size: +(rand() * 2 + 1).toFixed(2),
    delay: +(rand() * 5).toFixed(2),
    duration: +(2 + rand() * 4).toFixed(2),
}));

const NotFound = () => {
    const rootRef = useRef(null);
    const pathname = usePathname();

    useEffect(() => {
        const el = rootRef.current;
        if (!el) return;
        const handleMove = (e) => {
            el.style.setProperty('--mx', (e.clientX / window.innerWidth - 0.5).toFixed(3));
            el.style.setProperty('--my', (e.clientY / window.innerHeight - 0.5).toFixed(3));
            el.style.setProperty('--gx', `${e.clientX}px`);
            el.style.setProperty('--gy', `${e.clientY}px`);
        };
        window.addEventListener('mousemove', handleMove);
        return () => window.removeEventListener('mousemove', handleMove);
    }, []);

    return (
        <div className="nf-root" ref={rootRef}>
            <style>{`
                .nf-root {
                    position: relative;
                    min-height: 100vh;
                    overflow: hidden;
                    display: grid;
                    place-items: center;
                    padding: 24px;
                    color: #e8e8ff;
                    font-family: ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif;
                    background: radial-gradient(ellipse at 50% 120%, #1b1040 0%, #0a0a1f 50%, #05050f 100%);
                }
                .nf-glow {
                    position: absolute;
                    left: var(--gx, 50%);
                    top: var(--gy, 40%);
                    width: 520px;
                    height: 520px;
                    transform: translate(-50%, -50%);
                    background: radial-gradient(circle, rgba(124, 58, 237, 0.28), transparent 60%);
                    pointer-events: none;
                    transition: left 0.2s ease-out, top 0.2s ease-out;
                }
                .nf-star {
                    position: absolute;
                    border-radius: 50%;
                    background: #fff;
                    animation: nf-twinkle ease-in-out infinite;
                }
                @keyframes nf-twinkle {
                    0%, 100% { opacity: 0.15; transform: scale(0.8); }
                    50% { opacity: 1; transform: scale(1.2); }
                }

                .nf-content {
                    position: relative;
                    z-index: 2;
                    text-align: center;
                    max-width: 640px;
                }

                .nf-digits {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.05em;
                    font-size: clamp(6rem, 22vw, 13rem);
                    font-weight: 900;
                    line-height: 1;
                    transform: translate(calc(var(--mx, 0) * -22px), calc(var(--my, 0) * -22px));
                    transition: transform 0.2s ease-out;
                }
                .nf-digit {
                    background: linear-gradient(180deg, #ffffff 0%, #a78bfa 60%, #6d28d9 100%);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    filter: drop-shadow(0 0 24px rgba(139, 92, 246, 0.55));
                }

                .nf-planet {
                    position: relative;
                    width: 0.72em;
                    height: 0.72em;
                    margin: 0 0.04em;
                    border-radius: 50%;
                    background: radial-gradient(circle at 30% 30%, #c4b5fd, #7c3aed 45%, #1e1b4b 100%);
                    box-shadow: 0 0 70px rgba(139, 92, 246, 0.6), inset -0.08em -0.08em 0.18em rgba(0, 0, 0, 0.55);
                    animation: nf-float 6s ease-in-out infinite;
                }
                .nf-planet::after {
                    content: '';
                    position: absolute;
                    inset: 36% -38%;
                    border: 0.035em solid rgba(196, 181, 253, 0.65);
                    border-radius: 50%;
                    transform: rotate(-20deg);
                    box-shadow: 0 0 18px rgba(167, 139, 250, 0.5);
                }
                @keyframes nf-float {
                    0%, 100% { transform: translateY(-8px); }
                    50% { transform: translateY(10px); }
                }

                .nf-astronaut {
                    position: absolute;
                    top: -10px;
                    right: 6%;
                    font-size: clamp(2rem, 6vw, 3.5rem);
                    animation: nf-drift 9s ease-in-out infinite;
                    filter: drop-shadow(0 0 12px rgba(255, 255, 255, 0.35));
                }
                @keyframes nf-drift {
                    0%   { transform: translate(0, 0) rotate(-12deg); }
                    50%  { transform: translate(-30px, 24px) rotate(14deg); }
                    100% { transform: translate(0, 0) rotate(-12deg); }
                }

                .nf-title {
                    position: relative;
                    display: inline-block;
                    margin: 18px 0 8px;
                    font-size: clamp(1.5rem, 4vw, 2.2rem);
                    font-weight: 800;
                    letter-spacing: 0.04em;
                    text-transform: uppercase;
                }
                .nf-title::before,
                .nf-title::after {
                    content: attr(data-text);
                    position: absolute;
                    inset: 0;
                }
                .nf-title::before {
                    color: #22d3ee;
                    animation: nf-glitch-a 2.8s infinite linear alternate-reverse;
                }
                .nf-title::after {
                    color: #f43f5e;
                    animation: nf-glitch-b 2.2s infinite linear alternate-reverse;
                }
                @keyframes nf-glitch-a {
                    0%   { clip-path: inset(10% 0 80% 0); transform: translate(-3px, 0); }
                    20%  { clip-path: inset(60% 0 10% 0); transform: translate(3px, 0); }
                    40%  { clip-path: inset(30% 0 50% 0); transform: translate(-2px, 0); }
                    60%  { clip-path: inset(80% 0 5% 0);  transform: translate(2px, 0); }
                    80%  { clip-path: inset(5% 0 70% 0);  transform: translate(-3px, 0); }
                    100% { clip-path: inset(45% 0 35% 0); transform: translate(0, 0); }
                }
                @keyframes nf-glitch-b {
                    0%   { clip-path: inset(70% 0 10% 0); transform: translate(3px, 0); }
                    25%  { clip-path: inset(20% 0 60% 0); transform: translate(-3px, 0); }
                    50%  { clip-path: inset(50% 0 30% 0); transform: translate(2px, 0); }
                    75%  { clip-path: inset(5% 0 85% 0);  transform: translate(-2px, 0); }
                    100% { clip-path: inset(85% 0 2% 0);  transform: translate(3px, 0); }
                }

                .nf-text {
                    margin: 0 auto 8px;
                    color: #b4b4d6;
                    font-size: clamp(0.95rem, 2.2vw, 1.1rem);
                    line-height: 1.6;
                }
                .nf-path {
                    display: inline-block;
                    margin: 6px 0 28px;
                    padding: 4px 12px;
                    max-width: 100%;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    border-radius: 999px;
                    background: rgba(255, 255, 255, 0.06);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: #c4b5fd;
                    font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
                    font-size: 0.85rem;
                }

                .nf-actions {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 12px;
                    justify-content: center;
                }
                .nf-btn {
                    padding: 12px 26px;
                    border-radius: 12px;
                    font-size: 0.95rem;
                    font-weight: 700;
                    text-decoration: none;
                    cursor: pointer;
                    transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
                }
                .nf-btn:hover { transform: translateY(-3px); }
                .nf-btn-primary {
                    border: none;
                    color: #fff;
                    background: linear-gradient(135deg, #7c3aed, #4f46e5);
                    box-shadow: 0 8px 28px rgba(124, 58, 237, 0.45);
                }
                .nf-btn-primary:hover { box-shadow: 0 12px 36px rgba(124, 58, 237, 0.7); }
                .nf-btn-ghost {
                    color: #e8e8ff;
                    background: rgba(255, 255, 255, 0.05);
                    border: 1px solid rgba(255, 255, 255, 0.18);
                }
                .nf-btn-ghost:hover { background: rgba(255, 255, 255, 0.12); }

                @media (prefers-reduced-motion: reduce) {
                    .nf-star, .nf-planet, .nf-astronaut,
                    .nf-title::before, .nf-title::after { animation: none; }
                    .nf-title::before, .nf-title::after { display: none; }
                }
            `}</style>

            <div className="nf-glow" />

            {STARS.map((s) => (
                <span
                    key={s.id}
                    className="nf-star"
                    style={{
                        top: `${s.top}%`,
                        left: `${s.left}%`,
                        width: s.size,
                        height: s.size,
                        animationDelay: `${s.delay}s`,
                        animationDuration: `${s.duration}s`,
                    }}
                />
            ))}

            <div className="nf-content">
                <span className="nf-astronaut" role="img" aria-label="astronaut">
                    🧑‍🚀
                </span>

                <div className="nf-digits" aria-label="404">
                    <span className="nf-digit">4</span>
                    <span className="nf-planet" />
                    <span className="nf-digit">4</span>
                </div>

                <h1 className="nf-title" data-text="Lost in space">
                    Lost in space
                </h1>

                <p className="nf-text">
                    The page you are looking for drifted out of orbit, or never existed in this galaxy.
                </p>

                <code className="nf-path">{pathname}</code>

                <div className="nf-actions">
                    <Link href="/" className="nf-btn nf-btn-primary">
                        Take me home
                    </Link>
                    <button
                        type="button"
                        className="nf-btn nf-btn-ghost"
                        onClick={() => window.history.back()}
                    >
                        Go back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFound;