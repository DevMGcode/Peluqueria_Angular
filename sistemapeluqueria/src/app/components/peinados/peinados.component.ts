import {
  Component, OnInit, OnDestroy, AfterViewInit,
  ElementRef, HostListener
} from '@angular/core';

@Component({
    selector: 'app-peinados',
    templateUrl: './peinados.component.html',
    styleUrls: ['./peinados.component.css'],
    standalone: false
})
export class PeinadosComponent implements OnInit, AfterViewInit, OnDestroy {

  // Partículas hero
  particles = Array.from({ length: 22 }, () => ({
    x:    Math.random() * 100,
    y:    Math.random() * 100,
    size: Math.random() * 4 + 2,
    delay: Math.random() * 6,
    dur:  Math.random() * 6 + 5
  }));

  // Ticker palabras
  tickerWords = ['Trenzas', 'Bucles', 'Coletas', 'Ondas', 'Glamour', 'Premium', 'Elegancia', 'Arte', 'Estilo', 'Belleza'];

  // Typewriter eyebrow
  eyebrowText = '';
  private readonly eyebrowFull = 'Catálogo de Servicios';

  // Stats
  statTutorials = 0;
  statStyles    = 0;
  statClients   = 0;
  private statsStarted = false;

  // Sección activa
  activeSection = 'hero';

  // Parallax mosaico
  private scrollY = 0;
  get mosaicParallax() {
    return {
      transform: `translateY(${this.scrollY * 0.06}px)`,
      transition: 'transform 0.1s linear'
    };
  }

  // Cursor
  private cursorDot: HTMLElement | null = null;
  private dotX = -300; private dotY = -300;
  private rafCursor = 0;
  private lastParticleTime = 0;

  private revealObserver:  IntersectionObserver | null = null;
  private sectionObserver: IntersectionObserver | null = null;
  private statsObserver:   IntersectionObserver | null = null;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupScrollReveal();
    this.setupCardTilt();
    this.setupCursor();
    this.setupSectionObserver();
    this.setupStatsObserver();
    this.runTypewriter();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.sectionObserver?.disconnect();
    this.statsObserver?.disconnect();
    cancelAnimationFrame(this.rafCursor);
  }

  // ─── Scroll ──────────────────────────────────────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    this.scrollY = window.pageYOffset;
  }

  // ─── Sección activa (para dots y chips) ─────────────────────────
  private setupSectionObserver(): void {
    const sections = ['pn-top', 'trenzas', 'bucles', 'coletas'];
    const map: Record<string, string> = { 'pn-top': 'hero', trenzas: 'trenzas', bucles: 'bucles', coletas: 'coletas' };
    this.sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) this.activeSection = map[e.target.id] ?? 'hero';
      });
    }, { threshold: 0.35 });
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (el) this.sectionObserver!.observe(el);
    });
  }

  // ─── Stats observado ─────────────────────────────────────────────
  private setupStatsObserver(): void {
    const statsEl = this.el.nativeElement.querySelector('.pn-hero__stats');
    if (!statsEl) return;
    this.statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting && !this.statsStarted) {
          this.statsStarted = true;
          this.animateCount('statTutorials', 12,  1200);
          this.animateCount('statStyles',    3,   800);
          this.animateCount('statClients',   500, 1800);
          this.statsObserver!.disconnect();
        }
      });
    }, { threshold: 0.5 });
    this.statsObserver.observe(statsEl);
  }

  private animateCount(prop: 'statTutorials' | 'statStyles' | 'statClients', end: number, dur: number): void {
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

  // ─── Typewriter ───────────────────────────────────────────────────
  private runTypewriter(): void {
    let i = 0;
    const type = () => {
      if (i <= this.eyebrowFull.length) {
        this.eyebrowText = this.eyebrowFull.slice(0, i++);
        setTimeout(type, 45);
      }
    };
    setTimeout(type, 400);
  }

  // ─── Cursor ───────────────────────────────────────────────────────
  private setupCursor(): void {
    this.cursorDot = document.querySelector('.ns-cursor-dot');
    this.rafCursor = requestAnimationFrame(() => this.moveDot());
    document.querySelectorAll('a, button, .pn-chip, .pn-video-card, .pn-feature-img').forEach(el => {
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

  // ─── Scroll Reveal ────────────────────────────────────────────────
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

  // ─── Card Tilt ───────────────────────────────────────────────────
  private setupCardTilt(): void {
    const cards = this.el.nativeElement.querySelectorAll('.pn-video-card, .pn-feature-img');
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform  = `perspective(700px) rotateX(${-y*7}deg) rotateY(${x*7}deg) translateY(-6px) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
      });
    });
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
