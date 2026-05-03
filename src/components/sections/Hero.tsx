"use client";

import { useEffect, useRef } from "react";
import { Github, Linkedin, Twitter, ArrowDown } from "lucide-react";
import { personalInfo, stats } from "@/data/portfolio";

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    const particles: { x: number; y: number; vx: number; vy: number; r: number; alpha: number }[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.1,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha})`;
        ctx.fill();

        particles.slice(i + 1).forEach((p2) => {
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.06 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-dark"
    >
      <ParticleCanvas />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-accent/5 blur-3xl" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Text content */}
          <div className="flex-1 text-center lg:text-left animate-fade-in">
            <p className="section-subtitle mb-6">Bienvenue sur mon portfolio</p>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-tight mb-4">
              Loé{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-dark">
                Zegou
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl font-medium text-muted mb-6">
              {personalInfo.title} —{" "}
              <span className="text-white">{personalInfo.subtitle}</span>
            </h2>

            <p className="text-muted leading-relaxed max-w-xl mx-auto lg:mx-0 mb-8">
              {personalInfo.tagline}
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-10">
              <a href="#projects" className="btn-primary">
                Voir mes projets
                <ArrowDown size={16} />
              </a>
              <a href={`mailto:${personalInfo.email}`} className="btn-outline">
                Me contacter
              </a>
            </div>

            {/* Social links */}
            <div className="flex gap-4 justify-center lg:justify-start">
              <a
                href={personalInfo.social.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="GitHub"
              >
                <Github size={18} />
              </a>
              <a
                href={personalInfo.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href={personalInfo.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-dark-4 flex items-center justify-center text-muted hover:text-accent hover:border-accent transition-all duration-200"
                aria-label="Twitter / X"
              >
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Profile image */}
          <div className="flex-shrink-0 animate-float">
            <div className="relative">
              {/* Rotating ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/30 animate-spin-slow" />
              <div className="absolute -inset-4 rounded-full border border-accent/10" />

              <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-dark-3 glow">
                {/* Placeholder gradient avatar */}
                <div className="w-full h-full bg-gradient-to-br from-dark-3 via-dark-4 to-dark-3 flex items-center justify-center">
                  <span className="text-7xl font-black text-accent/30 select-none">LZ</span>
                </div>
              </div>

              {/* Badge */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-dark-3 border border-accent/30 rounded-full px-4 py-2 text-xs font-semibold text-accent whitespace-nowrap">
                Disponible
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="card text-center hover:scale-105 transition-transform duration-300"
            >
              <div className="text-3xl font-black text-accent mb-1">{stat.value}</div>
              <div className="text-sm text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted hover:text-accent transition-colors"
      >
        <span className="text-xs tracking-widest uppercase">Défiler</span>
        <div className="w-px h-10 bg-gradient-to-b from-accent/50 to-transparent" />
      </a>
    </section>
  );
}
