"use client"

import { useState, useEffect } from "react";
import Link from "next/link";

const GLITCH_CHARS = "!@#$%^&*<>?/\\|{}[]~`";

function useGlitch(text, active) {
  const [display, setDisplay] = useState(text);

  useEffect(() => {
    if (!active) { setDisplay(text); return; }
    let frame = 0;
    const total = 18;
    const interval = setInterval(() => {
      if (frame >= total) { setDisplay(text); clearInterval(interval); return; }
      setDisplay(
        text.split("").map((ch, i) =>
          Math.random() > 0.55 ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)] : ch
        ).join("")
      );
      frame++;
    }, 38);
    return () => clearInterval(interval);
  }, [active, text]);

  return display;
}

function GlitchText({ text, className, style }) {
  const [active, setActive] = useState(false);
  const display = useGlitch(text, active);

  useEffect(() => {
    const t = setTimeout(() => setActive(true), 800);
    return () => clearTimeout(t);
  }, []);

  return (
    <span
      className={className}
      style={style}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {display}
    </span>
  );
}

export default function NotFound() {
  const [hoverBtn, setHoverBtn] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0b1220",
      color: "#5eead4",
      fontFamily: "'Courier New', Courier, monospace",
      position: "relative",
      overflow: "hidden",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Share+Tech+Mono&display=swap');

        * { box-sizing: border-box; }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }

        @keyframes flicker {
          0%, 98%, 100% { opacity: 1; }
          99% { opacity: 0.85; }
        }

        @keyframes glitchShift {
          0%, 90%, 100% { clip-path: none; transform: none; }
          92% { clip-path: inset(30% 0 40% 0); transform: translateX(-4px); }
          94% { clip-path: inset(60% 0 10% 0); transform: translateX(6px); }
          96% { clip-path: inset(10% 0 70% 0); transform: translateX(-2px); }
        }

        @keyframes gridPulse {
          0%, 100% { opacity: 0.03; }
          50% { opacity: 0.07; }
        }

        @keyframes orbitSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes orbitSpinRev {
          from { transform: rotate(0deg); }
          to { transform: rotate(-360deg); }
        }

        @keyframes dotPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.6; }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .page-flicker { animation: flicker 6s infinite; }

        .glitch-404 {
          position: relative;
          font-size: clamp(6rem, 18vw, 14rem);
          font-weight: 900;
          line-height: 1;
          letter-spacing: -0.06em;
          color: #5eead4;
          text-shadow:
            0 0 20px rgba(94,234,212,0.4),
            0 0 60px rgba(94,234,212,0.15);
          font-family: 'Share Tech Mono', 'Courier New', monospace;
          animation: glitchShift 4.5s infinite;
          user-select: none;
        }

        .glitch-404::before {
          content: "404";
          position: absolute;
          left: 3px;
          top: 0;
          color: #14b8a6;
          opacity: 0.55;
          clip-path: inset(0 0 0 0);
          animation: glitchShift 3.2s infinite 0.15s;
          pointer-events: none;
        }

        .glitch-404::after {
          content: "404";
          position: absolute;
          left: -3px;
          top: 0;
          color: #2dd4bf;
          opacity: 0.45;
          clip-path: inset(0 0 0 0);
          animation: glitchShift 2.8s infinite 0.3s reverse;
          pointer-events: none;
        }

        .scanline {
          position: fixed;
          top: 0; left: 0; right: 0;
          height: 2px;
          background: linear-gradient(transparent, rgba(45,212,191,0.12), transparent);
          animation: scanline 5s linear infinite;
          pointer-events: none;
          z-index: 9999;
        }

        .grid-bg {
          position: fixed;
          inset: 0;
          background-image:
            linear-gradient(rgba(14,165,164,0.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(14,165,164,0.08) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: gridPulse 4s ease-in-out infinite;
          pointer-events: none;
        }

        .vignette {
          position: fixed;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
        }

        .orbit-container {
          position: relative;
          width: 180px;
          height: 180px;
          flex-shrink: 0;
        }

        .orbit-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid rgba(94,234,212,0.28);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }

        .orbit-ring-1 {
          width: 160px; height: 160px;
          animation: orbitSpin 8s linear infinite;
        }

        .orbit-ring-2 {
          width: 120px; height: 120px;
          animation: orbitSpinRev 5s linear infinite;
        }

        .orbit-ring-3 {
          width: 80px; height: 80px;
          border-style: dashed;
          animation: orbitSpin 3s linear infinite;
        }

        .orbit-dot {
          position: absolute;
          border-radius: 50%;
          animation: dotPulse 2s ease-in-out infinite;
        }

        .center-404-small {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          font-size: 1.1rem;
          font-weight: 900;
          color: #5eead4;
          letter-spacing: 0.05em;
          text-shadow: 0 0 12px rgba(94,234,212,0.5);
          font-family: 'Share Tech Mono', monospace;
        }

        .go-home-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          border: 1px solid rgba(94,234,212,0.55);
          background: transparent;
          color: #5eead4;
          font-family: 'Share Tech Mono', 'Courier New', monospace;
          font-size: 0.75rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          padding: 12px 28px;
          cursor: pointer;
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
          animation: fadeInUp 0.6s ease 2.5s both;
        }

        .go-home-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: rgba(45,212,191,0.12);
          transform: translateX(-100%);
          transition: transform 0.3s ease;
        }

        .go-home-btn:hover::before { transform: translateX(0); }
        .go-home-btn:hover {
          border-color: #2dd4bf;
          box-shadow: 0 0 20px rgba(45,212,191,0.24), inset 0 0 20px rgba(45,212,191,0.08);
          color: #ccfbf1;
        }

        .status-bar {
          position: fixed;
          bottom: 0; left: 0; right: 0;
          border-top: 1px solid rgba(94,234,212,0.2);
          background: rgba(15,23,42,0.95);
          padding: 8px 24px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.6rem;
          letter-spacing: 0.15em;
          color: rgba(148,163,184,0.9);
          z-index: 100;
        }

        .status-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #14b8a6;
          display: inline-block;
          margin-right: 6px;
          animation: dotPulse 1.5s ease-in-out infinite;
        }

        .heading-sub {
          font-size: 0.7rem;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: rgba(94,234,212,0.75);
          margin-bottom: 8px;
          animation: fadeInUp 0.5s ease 0.3s both;
          opacity: 0;
        }

        .tagline {
          font-size: 0.85rem;
          color: rgba(148,163,184,0.95);
          letter-spacing: 0.05em;
          margin-top: 6px;
          animation: fadeInUp 0.5s ease 0.9s both;
          opacity: 0;
        }
      `}</style>

      {/* BG Effects */}
      <div className="grid-bg" />
      <div className="scanline" />
      <div className="vignette" />

      {/* Main Content */}
      <div className="page-flicker" style={{ position: "relative", zIndex: 10, width: "100%", maxWidth: 860, display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}>

        {/* Top label */}
        <p className="heading-sub">Navigation Error Detected</p>

        {/* Big 404 + orbit side by side */}
        <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap", justifyContent: "center" }}>
          <div style={{ textAlign: "center" }}>
            <div className="glitch-404">404</div>
            <p className="tagline">PAGE_NOT_FOUND.exe has stopped working</p>
          </div>

          {/* Orbit diagram */}
          <div className="orbit-container">
            <div className="orbit-ring orbit-ring-1">
              {/* dot on ring 1 */}
              <div className="orbit-dot" style={{
                width: 8, height: 8,
                background: "#0ea5a4",
                top: -4, left: "50%", marginLeft: -4,
                boxShadow: "0 0 8px #0ea5a4",
                animationDelay: "0.4s",
              }} />
            </div>
            <div className="orbit-ring orbit-ring-2">
              <div className="orbit-dot" style={{
                width: 6, height: 6,
                background: "#2dd4bf",
                bottom: -3, left: "50%", marginLeft: -3,
                boxShadow: "0 0 6px #2dd4bf",
              }} />
            </div>
            <div className="orbit-ring orbit-ring-3">
              <div className="orbit-dot" style={{
                width: 5, height: 5,
                background: "#5eead4",
                top: -2.5, left: "50%", marginLeft: -2.5,
                boxShadow: "0 0 6px #5eead4",
                animationDelay: "0.8s",
              }} />
            </div>
            <div className="center-404-small">ERR</div>
          </div>
        </div>

        {/* CTA */}
        <Link href="/" className="go-home-btn">
          <span style={{ fontSize: "1rem" }}>←</span>
          Return to home
        </Link>
      </div>

      {/* Status Bar */}
      <div className="status-bar">
        <span><span className="status-dot" />ERROR: 404 · PATH UNRESOLVED</span>
        <span>SYS::TRAVELEE · BUILD 2026.1</span>
        <span>LAT: —— · LNG: ——</span>
      </div>
    </div>
  );
}
