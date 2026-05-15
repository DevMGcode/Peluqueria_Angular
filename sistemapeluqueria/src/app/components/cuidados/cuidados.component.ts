import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, HostListener } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  mostrarDescripcion: boolean;
}

@Component({
    selector: 'app-cuidados',
    templateUrl: './cuidados.component.html',
    styleUrls: ['./cuidados.component.css'],
    standalone: false
})
export class CuidadosComponent implements OnInit, AfterViewInit, OnDestroy {

  productos: Producto[] = [];
  carrito: Producto[] = [];
  mostrarVentanaEmergente = false;

  private revealObserver: IntersectionObserver | null = null;
  private cursorDot: HTMLElement | null = null;
  private dotX = -300; private dotY = -300;
  private rafCursor = 0;
  private lastParticleTime = 0;

  constructor(private http: HttpClient, private el: ElementRef) {}

  ngOnInit(): void {
    this.http.get<Producto[]>('assets/productos.json').subscribe(data => {
      this.productos = data.map(p => ({ ...p, mostrarDescripcion: false }));
      setTimeout(() => {
        this.setupScrollReveal();
        this.setupCardTilt();
      }, 150);
    });
  }

  ngAfterViewInit(): void {
    this.setupCursor();
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    cancelAnimationFrame(this.rafCursor);
  }

  private setupCursor(): void {
    this.cursorDot = document.querySelector('.ns-cursor-dot');
    this.rafCursor = requestAnimationFrame(() => this.moveDot());
    document.querySelectorAll('a, button, .cd-card').forEach(el => {
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

  private setupScrollReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.ns-reveal');
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('ns-reveal--visible');
          this.revealObserver!.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    items.forEach((el: Element) => this.revealObserver!.observe(el));
  }

  private setupCardTilt(): void {
    setTimeout(() => {
      const cards = this.el.nativeElement.querySelectorAll('.cd-card');
      cards.forEach((card: HTMLElement) => {
        card.addEventListener('mousemove', (e: MouseEvent) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width  - 0.5;
          const y = (e.clientY - r.top)  / r.height - 0.5;
          card.style.transform  = `perspective(800px) rotateX(${-y*5}deg) rotateY(${x*5}deg) translateY(-6px) scale(1.02)`;
          card.style.transition = 'transform 0.1s ease-out';
        });
        card.addEventListener('mouseleave', () => {
          card.style.transform  = '';
          card.style.transition = 'transform 0.6s cubic-bezier(0.22,1,0.36,1)';
        });
      });
    }, 600);
  }

  toggleDescripcion(index: number, mostrar: boolean): void {
    this.productos[index].mostrarDescripcion = mostrar;
  }

  formatearPrecio(precio: number): string {
    return `$ ${precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  abrirVentanaEmergente(): void  { this.mostrarVentanaEmergente = true; }
  cerrarVentanaEmergente(): void { this.mostrarVentanaEmergente = false; }

  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    this.mostrarVentanaEmergente = true;
  }

  reiniciarCarrito(): void { this.carrito = []; }
}
