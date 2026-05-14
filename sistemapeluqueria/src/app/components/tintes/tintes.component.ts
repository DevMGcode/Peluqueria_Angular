import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-tintes',
  templateUrl: './tintes.component.html',
  styleUrls: ['./tintes.component.css']
})
export class TintesComponent implements OnInit, AfterViewInit, OnDestroy {

  // Burbujas de color flotantes
  bubbles = Array.from({ length: 20 }, () => {
    const colors = [
      'rgba(212,175,55,0.35)', 'rgba(201,116,143,0.35)',
      'rgba(180,100,200,0.3)', 'rgba(220,150,80,0.3)',
      'rgba(150,80,180,0.3)',  'rgba(240,180,100,0.3)',
    ];
    return {
      x:     Math.random() * 100,
      y:     Math.random() * 100,
      size:  Math.random() * 22 + 8,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 8,
      dur:   Math.random() * 8 + 7,
    };
  });

  // Paleta de colores
  swatches = [
    { name: 'Rubio',      color: '#f5deb3' },
    { name: 'Dorado',     color: '#d4af37' },
    { name: 'Cobrizo',    color: '#c8621a' },
    { name: 'Castaño',    color: '#7b4b2a' },
    { name: 'Negro',      color: '#1a1208' },
    { name: 'Rosa',       color: '#e8a0b8' },
    { name: 'Borgoña',    color: '#800020' },
    { name: 'Violeta',    color: '#7f00ff' },
    { name: 'Cenizo',     color: '#b0a090' },
    { name: 'Platino',    color: '#e8e4d8' },
    { name: 'Azabache',   color: '#0a0a0a' },
    { name: 'Fantasía',   color: '#c9748f' },
  ];

  selectedSwatch = '';

  // Chips de técnicas
  techniques = ['Balayage', 'Mechas', 'Tinte completo', 'Decoloración', 'Color fantasía', 'Igora Royal'];

  // Typewriter
  eyebrowText = '';
  private readonly eyebrowFull = 'Color & Tintes Premium';

  // Stats
  statColors = 0;
  statTech   = 0;
  statYears  = 0;
  private statsStarted = false;

  // Carousel
  carouselPlaying = true;

  // Cursor
  private cursorDot: HTMLElement | null = null;
  private dotX = -300; private dotY = -300;
  private rafCursor = 0;
  private lastParticleTime = 0;

  private revealObserver: IntersectionObserver | null = null;
  private statsObserver:  IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}
  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollReveal();
    this.setupCardTilt();
    this.setupCursor();
    this.setupStatsObserver();
    this.setupMagneticBtn();
    this.runTypewriter();
    this.setupSwatchReveal();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.statsObserver?.disconnect();
    cancelAnimationFrame(this.rafCursor);
  }

  // ─── Typewriter ───────────────────────────────────────────────
  private runTypewriter(): void {
    let i = 0;
    const type = () => {
      if (i <= this.eyebrowFull.length) {
        this.eyebrowText = this.eyebrowFull.slice(0, i++);
        setTimeout(type, 48);
      }
    };
    setTimeout(type, 500);
  }

  // ─── Stats ────────────────────────────────────────────────────
  private setupStatsObserver(): void {
    const el = this.el.nativeElement.querySelector('.tn-stats');
    if (!el) return;
    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !this.statsStarted) {
          this.statsStarted = true;
          this.animateCount('statColors', 80,  1500);
          this.animateCount('statTech',   6,   900);
          this.animateCount('statYears',  10,  1200);
          this.statsObserver!.disconnect();
        }
      });
    }, { threshold: 0.5 });
    this.statsObserver.observe(el);
  }

  private animateCount(prop: 'statColors' | 'statTech' | 'statYears', end: number, dur: number): void {
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      (this as any)[prop] = Math.floor(end * eased);
      if (p < 1) requestAnimationFrame(tick);
      else (this as any)[prop] = end;
    };
    requestAnimationFrame(tick);
  }

  // ─── Interacción swatches ────────────────────────────────────
  onSwatchMove(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    const r  = el.getBoundingClientRect();
    const x  = ((e.clientX - r.left) / r.width  * 100).toFixed(1) + '%';
    const y  = ((e.clientY - r.top)  / r.height * 100).toFixed(1) + '%';
    el.style.setProperty('--mx', x);
    el.style.setProperty('--my', y);
  }

  onSwatchLeave(e: MouseEvent): void {
    const el = e.currentTarget as HTMLElement;
    el.style.removeProperty('--mx');
    el.style.removeProperty('--my');
  }

  onSwatchClick(e: MouseEvent, name: string): void {
    this.selectedSwatch = this.selectedSwatch === name ? '' : name;
    const el   = e.currentTarget as HTMLElement;
    const r    = el.getBoundingClientRect();
    const size = 60;
    const ripple = document.createElement('div');
    ripple.className = 'tn-swatch__ripple';
    ripple.style.cssText = `
      width:${size}px; height:${size}px;
      left:${e.clientX - r.left - size/2}px;
      top:${e.clientY - r.top  - size/2}px;
    `;
    el.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  getSwatchColor(name: string): string {
    return this.swatches.find(s => s.name === name)?.color ?? '#d4af37';
  }

  // ─── Swatch reveal escalonado ─────────────────────────────────
  private setupSwatchReveal(): void {
    const swatches = this.el.nativeElement.querySelectorAll('.tn-swatch');
    const obs = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        swatches.forEach((s: HTMLElement, i: number) => {
          setTimeout(() => s.classList.add('tn-swatch--visible'), i * 60);
        });
        obs.disconnect();
      }
    }, { threshold: 0.2 });
    const palette = this.el.nativeElement.querySelector('.tn-palette');
    if (palette) obs.observe(palette);
  }

  // ─── Botón magnético ─────────────────────────────────────────
  private setupMagneticBtn(): void {
    const btn = this.el.nativeElement.querySelector('.tn-magnetic');
    if (!btn) return;
    btn.addEventListener('mousemove', (e: MouseEvent) => {
      const r  = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * 0.3;
      const dy = (e.clientY - (r.top  + r.height / 2)) * 0.3;
      btn.style.transform  = `translate(${dx}px, ${dy}px) scale(1.05)`;
      btn.style.transition = 'transform 0.1s ease-out';
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform  = '';
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.4,0.64,1)';
    });
  }

  // ─── Cursor ───────────────────────────────────────────────────
  private setupCursor(): void {
    this.cursorDot = document.querySelector('.ns-cursor-dot');
    this.rafCursor = requestAnimationFrame(() => this.moveDot());
    document.querySelectorAll('a, button, .tn-video-card, .tn-carousel-wrap, .tn-swatch').forEach(el => {
      el.addEventListener('mouseenter', () => this.cursorDot?.classList.add('ns-cursor-dot--hover'));
      el.addEventListener('mouseleave', () => this.cursorDot?.classList.remove('ns-cursor-dot--hover'));
    });
  }

  private moveDot(): void {
    if (this.cursorDot) {
      this.cursorDot.style.left = this.dotX + 'px';
      this.cursorDot.style.top  = this.dotY + 'px';
    }
    this.rafCursor = requestAnimationFrame(() => this.moveDot());
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.dotX = e.clientX;
    this.dotY = e.clientY;
    this.spawnParticle(e.clientX, e.clientY);
  }

  private spawnParticle(x: number, y: number): void {
    const now = performance.now();
    if (now - this.lastParticleTime < 55) return;
    this.lastParticleTime = now;
    const isRose = Math.random() > 0.45;
    const size   = Math.random() * 5 + 2;
    const p      = document.createElement('div');
    p.style.cssText = `
      position:fixed;pointer-events:none;z-index:9997;border-radius:50%;
      left:${x}px;top:${y}px;width:${size}px;height:${size}px;
      background:${isRose ? 'rgba(201,116,143,0.9)' : 'rgba(212,175,55,0.9)'};
      box-shadow:0 0 ${size*2}px ${isRose ? 'rgba(201,116,143,0.5)' : 'rgba(212,175,55,0.5)'};
      transform:translate(-50%,-50%);
      animation:trailFade 0.85s ease-out forwards;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }

  // ─── Scroll Reveal ────────────────────────────────────────────
  private setupScrollReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.ns-reveal');
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ns-reveal--visible');
          this.revealObserver!.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((el: Element) => this.revealObserver!.observe(el));
  }

  // ─── Card Tilt ───────────────────────────────────────────────
  private setupCardTilt(): void {
    const cards = this.el.nativeElement.querySelectorAll('.tn-video-card, .tn-carousel-wrap');
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform  = `perspective(800px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-6px) scale(1.015)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.65s cubic-bezier(0.22,1,0.36,1)';
      });
    });
  }
}
