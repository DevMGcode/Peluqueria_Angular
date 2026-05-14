import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-maquillaje',
  templateUrl: './maquillaje.component.html',
  styleUrls: ['./maquillaje.component.css']
})
export class MaquillajeComponent implements OnInit, AfterViewInit, OnDestroy {

  private revealObserver: IntersectionObserver | null = null;
  private cursorDot: HTMLElement | null = null;
  private dotX = -300; private dotY = -300;
  private rafCursor = 0;
  private lastParticleTime = 0;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.setupCursor();
    setTimeout(() => {
      this.setupScrollReveal();
      this.setupCardTilt();
    }, 80);
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    cancelAnimationFrame(this.rafCursor);
  }

  private setupCursor(): void {
    this.cursorDot = document.querySelector('.ns-cursor-dot');
    this.rafCursor = requestAnimationFrame(() => this.moveDot());
    document.querySelectorAll('a, button, .mq-card').forEach(el => {
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
      box-shadow:0 0 ${size * 2}px ${isRose ? 'rgba(201,116,143,0.5)' : 'rgba(212,175,55,0.5)'};
      transform:translate(-50%,-50%);
      animation:trailFade 0.85s ease-out forwards;
    `;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 850);
  }

  private setupScrollReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.ns-reveal');
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ns-reveal--visible');
          this.revealObserver!.unobserve(e.target);
        }
      });
    }, { threshold: 0.08 });
    items.forEach((item: Element) => this.revealObserver!.observe(item));
  }

  private setupCardTilt(): void {
    const items = this.el.nativeElement.querySelectorAll('.mq-mosaic__item');
    items.forEach((item: HTMLElement) => {
      item.addEventListener('mousemove', (e: MouseEvent) => {
        const r = item.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        item.style.transform  = `perspective(1000px) rotateX(${-y * 3}deg) rotateY(${x * 3}deg)`;
        item.style.transition = 'transform 0.1s ease-out';
      });
      item.addEventListener('mouseleave', () => {
        item.style.transform  = '';
        item.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
      });
    });
  }
}
