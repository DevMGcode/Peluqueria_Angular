import { Component, OnInit, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-barradenavegacion',
  templateUrl: './barradenavegacion.component.html',
  styleUrls: ['./barradenavegacion.component.css']
})
export class BarradenavegacionComponent implements OnInit {

  scrolled   = false;
  menuOpen   = false;

  navLinks = [
    { path: '/',           label: 'Inicio',     icon: 'fas fa-home'    },
    { path: '/peinados',   label: 'Peinados',   icon: 'fas fa-wind'    },
    { path: '/cortes',     label: 'Cortes',     icon: 'fas fa-cut'     },
    { path: '/tintes',     label: 'Tintes',     icon: 'fas fa-palette' },
    { path: '/cuidados',   label: 'Cuidados',   icon: 'fas fa-spa'     },
    { path: '/maquillaje', label: 'Maquillaje', icon: 'fas fa-eye'     },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => { this.menuOpen = false; });
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.pageYOffset > 55;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? 'hidden' : '';
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = '';
  }

  isActive(path: string): boolean {
    if (path === '/') return this.router.url === '/';
    return this.router.url.startsWith(path);
  }
}
