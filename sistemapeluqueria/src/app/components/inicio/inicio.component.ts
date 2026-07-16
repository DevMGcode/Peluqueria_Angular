import {
  Component, OnInit, OnDestroy, AfterViewInit,
  HostListener, ElementRef
} from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-inicio',
    templateUrl: './inicio.component.html',
    styleUrls: ['./inicio.component.css'],
    standalone: false
})
export class InicioComponent implements OnInit, AfterViewInit, OnDestroy {

  citaForm: UntypedFormGroup;
  titulo_form = 'Agenda tu cita';
  id: string | null;

  // Barra de progreso
  scrollProgress = 0;

  // Tilt 3D mosaico
  tiltX = 0;
  tiltY = 0;
  isHoveringHero = false;

  // Contadores
  statClientes = 0;
  statAnios    = 0;
  private countersStarted = false;

  // Typewriter badge
  badgeText = '';
  private readonly badgeFull = 'NUEVOS ESTILOS · EXPERIENCIA DE BELLEZA EXCLUSIVA';

  // Lightbox galería
  lightboxSrc = '';

  // Cursor
  private cursorDot: HTMLElement | null = null;
  private dotX = -300; private dotY = -300;
  private rafCursor = 0;

  // Partículas
  private lastParticleTime = 0;

  // Observers
  private revealObserver:  IntersectionObserver | null = null;
  private counterObserver: IntersectionObserver | null = null;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _citaService: CitaService,
    private authService: AuthService,
    private idRoute: ActivatedRoute,
    private el: ElementRef
  ) {
    this.citaForm = this.fb.group({
      citaNombre: ['', [Validators.required]],
      citaFecha:  ['', Validators.required],
      citaHora:   ['', Validators.required],
      citaMotivo: ['', Validators.required],
    });
    this.id = this.idRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void { this.accionSolicity(); }

  ngAfterViewInit(): void {
    this.setupScrollReveal();
    this.setupCounterObserver();
    this.setupCursor();
    this.setupCardTilt();
    this.setupMagneticButtons();
    this.runTypewriter();
    this.handleFragment();
  }

  private handleFragment(): void {
    this.idRoute.fragment.subscribe(fragment => {
      if (fragment) {
        setTimeout(() => {
          const el = document.getElementById(fragment);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 120);
      }
    });
  }

  ngOnDestroy(): void {
    this.revealObserver?.disconnect();
    this.counterObserver?.disconnect();
    cancelAnimationFrame(this.rafCursor);
  }

  // ─── Cursor (solo punto, sin anillo) ────────────────────────────
  private setupCursor(): void {
    this.cursorDot = document.querySelector('.ns-cursor-dot');
    this.rafCursor = requestAnimationFrame(() => this.moveDot());

    // Encoger punto sobre interactivos
    document.querySelectorAll('a, button, .ns-feature-card, .ns-service-card, .ns-gallery__item').forEach(el => {
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

  // ─── Typewriter badge ────────────────────────────────────────────
  private runTypewriter(): void {
    let i = 0;
    const type = () => {
      if (i <= this.badgeFull.length) {
        this.badgeText = this.badgeFull.slice(0, i);
        i++;
        setTimeout(type, 38);
      }
    };
    setTimeout(type, 600);
  }

  // ─── Botones magnéticos ──────────────────────────────────────────
  private setupMagneticButtons(): void {
    const btns = this.el.nativeElement.querySelectorAll('.ns-btn');
    btns.forEach((btn: HTMLElement) => {
      btn.addEventListener('mousemove', (e: MouseEvent) => {
        const r  = btn.getBoundingClientRect();
        const cx = r.left + r.width  / 2;
        const cy = r.top  + r.height / 2;
        const dx = (e.clientX - cx) * 0.28;
        const dy = (e.clientY - cy) * 0.28;
        btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
        btn.style.transition = 'transform 0.1s ease-out';
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transform  = '';
        btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.4,0.64,1), box-shadow 0.35s ease';
        setTimeout(() => { btn.style.transform = ''; btn.style.transition = ''; }, 500);
      });
    });
  }

  // ─── Mouse move ─────────────────────────────────────────────────
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    this.dotX = e.clientX;
    this.dotY = e.clientY;
    this.spawnParticle(e.clientX, e.clientY);

    if (this.isHoveringHero) {
      const hero = this.el.nativeElement.querySelector('.ns-hero');
      if (hero) {
        const rect = hero.getBoundingClientRect();
        this.tiltX = ((e.clientY - rect.top)  / rect.height - 0.5) *  6;
        this.tiltY = ((e.clientX - rect.left) / rect.width  - 0.5) * -6;
      }
    }
  }

  onHeroEnter(): void { this.isHoveringHero = true; }
  onHeroLeave(): void { this.isHoveringHero = false; this.tiltX = 0; this.tiltY = 0; }

  get mosaicStyle() {
    return {
      transform:  `perspective(1100px) rotateX(${this.tiltX}deg) rotateY(${this.tiltY}deg) scale(1.01)`,
      transition: this.isHoveringHero ? 'transform 0.12s ease-out' : 'transform 0.65s cubic-bezier(0.22,1,0.36,1)'
    };
  }

  // ─── Scroll ─────────────────────────────────────────────────────
  @HostListener('window:scroll')
  onWindowScroll(): void {
    const scrollTop = window.pageYOffset;
    const docH      = document.documentElement.scrollHeight - window.innerHeight;
    this.scrollProgress = docH > 0 ? (scrollTop / docH) * 100 : 0;

    const content  = this.el.nativeElement.querySelector('.ns-hero__content');
    const wordmark = this.el.nativeElement.querySelector('.ns-hero__wordmark');
    const panel    = this.el.nativeElement.querySelector('.ns-hero__panel');
    if (content)  content.style.transform  = `translateY(${scrollTop * 0.1}px)`;
    if (wordmark) wordmark.style.transform = `translateY(${scrollTop * -0.12}px)`;
    if (panel)    panel.style.transform    = `translateY(${scrollTop * 0.05}px)`;
  }

  // ─── Partículas ──────────────────────────────────────────────────
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

  // ─── Tilt 3D en cards ────────────────────────────────────────────
  private setupCardTilt(): void {
    const cards = this.el.nativeElement.querySelectorAll(
      '.ns-feature-card, .ns-service-card, .ns-testimonial, .ns-form-card'
    );
    cards.forEach((card: HTMLElement) => {
      card.addEventListener('mousemove', (e: MouseEvent) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        card.style.transform  = `perspective(700px) rotateX(${-y*9}deg) rotateY(${x*9}deg) translateY(-10px) scale(1.025)`;
        card.style.transition = 'transform 0.1s ease-out';
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform  = '';
        card.style.transition = 'transform 0.65s cubic-bezier(0.22,1,0.36,1)';
        setTimeout(() => { card.style.transition = ''; }, 650);
      });
    });
  }

  // ─── Lightbox galería ────────────────────────────────────────────
  openLightbox(src: string): void {
    this.lightboxSrc = src;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxSrc = '';
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeLightbox(); }

  // ─── Scroll reveal ───────────────────────────────────────────────
  private setupScrollReveal(): void {
    const items = this.el.nativeElement.querySelectorAll('.ns-reveal');
    this.revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('ns-reveal--visible');
          this.revealObserver!.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    items.forEach((el: Element) => this.revealObserver!.observe(el));
  }

  // ─── Contadores animados ─────────────────────────────────────────
  private setupCounterObserver(): void {
    const statsEl = this.el.nativeElement.querySelector('.ns-hero__stats');
    if (!statsEl) return;
    this.counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !this.countersStarted) {
          this.countersStarted = true;
          this.animateCount('statClientes', 500, 1800);
          this.animateCount('statAnios',    10,  1400);
          this.counterObserver!.disconnect();
        }
      });
    }, { threshold: 0.6 });
    this.counterObserver.observe(statsEl);
  }

  private animateCount(prop: 'statClientes' | 'statAnios', end: number, duration: number): void {
    const start = performance.now();
    const tick  = (now: number) => {
      const p     = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      (this as any)[prop] = Math.floor(end * eased);
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        (this as any)[prop] = end;
        // Rebote visual al terminar
        const els = this.el.nativeElement.querySelectorAll('.ns-stat strong');
        els.forEach((el: HTMLElement) => el.classList.add('ns-stat--bounce'));
        setTimeout(() => els.forEach((el: HTMLElement) => el.classList.remove('ns-stat--bounce')), 600);
      }
    };
    requestAnimationFrame(tick);
  }

  // ─── Navegación suave ────────────────────────────────────────────
  scrollTo(sectionId: string): void {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ─── Formulario ─────────────────────────────────────────────────
  agrecita() {
    const CITA: cita = {
      nombre: this.citaForm.get('citaNombre')?.value,
      fecha:  this.citaForm.get('citaFecha')?.value,
      hora:   this.citaForm.get('citaHora')?.value,
      motivo: this.citaForm.get('citaMotivo')?.value,
      email:  this.authService.getUsuario()?.email ?? '',
    };
    if (this.id !== null) {
      this._citaService.putCita(this.id, CITA).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: '¡Cita ReAgendada!',
            html: `<span style="font-family:'Poppins',sans-serif;font-size:0.88rem;color:rgba(250,248,246,0.65);letter-spacing:0.5px">Tu reserva ha sido actualizada correctamente</span>`,
            background: '#0e0b08',
            color: '#faf8f6',
            iconColor: '#d4af37',
            confirmButtonColor: '#d4af37',
            timer: 2600,
            showConfirmButton: false,
            timerProgressBar: true
          }).then(() => this.router.navigate([this.destinoPostCita()]));
        },
        (error) => console.log(error)
      );
    } else {
      this._citaService.postCitas(CITA).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: '¡Cita Agendada!',
            html: `<span style="font-family:'Poppins',sans-serif;font-size:0.88rem;color:rgba(250,248,246,0.65);letter-spacing:0.5px">Tu reserva ha sido registrada exitosamente</span>`,
            background: '#0e0b08',
            color: '#faf8f6',
            iconColor: '#d4af37',
            confirmButtonColor: '#d4af37',
            timer: 2600,
            showConfirmButton: false,
            timerProgressBar: true
          }).then(() => this.router.navigate([this.destinoPostCita()]));
        },
        (error) => console.log(error)
      );
    }
  }

  // Tras guardar una cita: staff va al panel, cliente a su perfil, visitante al inicio
  private destinoPostCita(): string {
    if (this.authService.tieneRol('admin', 'empleado')) return 'agendar-citas';
    return this.authService.isAuthenticated() ? 'perfil' : '/';
  }

  accionSolicity() {
    if (this.id != null) {
      this.titulo_form = 'Re-agendar tu cita';
      this._citaService.getCita(this.id).subscribe(data => {
        this.citaForm.setValue({
          citaNombre: data.nombre,
          citaFecha:  data.fecha,
          citaHora:   data.hora,
          citaMotivo: data.motivo
        });
      });
    }
  }
}
