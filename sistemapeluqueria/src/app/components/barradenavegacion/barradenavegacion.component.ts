import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { AuthService, Usuario } from '../../services/auth.service';

@Component({
    selector: 'app-barradenavegacion',
    templateUrl: './barradenavegacion.component.html',
    styleUrls: ['./barradenavegacion.component.css'],
    standalone: false
})
export class BarradenavegacionComponent implements OnInit, OnDestroy {
    scrolled      = false;
    menuOpen      = false;
    dropdownOpen  = false;
    usuario: Usuario | null = null;
    private sub!: Subscription;

    navLinks = [
        { path: '/',           label: 'Inicio',     icon: 'fas fa-home'    },
        { path: '/peinados',   label: 'Peinados',   icon: 'fas fa-wind'    },
        { path: '/cortes',     label: 'Cortes',     icon: 'fas fa-cut'     },
        { path: '/tintes',     label: 'Tintes',     icon: 'fas fa-palette' },
        { path: '/cuidados',   label: 'Cuidados',   icon: 'fas fa-spa'     },
        { path: '/maquillaje', label: 'Maquillaje', icon: 'fas fa-eye'     },
    ];

    constructor(private router: Router, public authService: AuthService) {}

    ngOnInit(): void {
        this.router.events
            .pipe(filter(e => e instanceof NavigationEnd))
            .subscribe(() => {
                this.menuOpen     = false;
                this.dropdownOpen = false;
                document.body.style.overflow = '';
            });

        this.sub = this.authService.usuario$.subscribe(u => {
            this.usuario = u;
        });
    }

    ngOnDestroy(): void {
        this.sub?.unsubscribe();
    }

    @HostListener('window:scroll')
    onScroll(): void {
        this.scrolled = window.pageYOffset > 55;
    }

    @HostListener('document:keydown.escape')
    onEsc(): void {
        this.dropdownOpen = false;
        this.closeMenu();
    }

    toggleMenu(): void {
        this.menuOpen = !this.menuOpen;
        this.dropdownOpen = false;
        document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    }

    closeMenu(): void {
        this.menuOpen = false;
        document.body.style.overflow = '';
    }

    toggleDropdown(): void {
        this.dropdownOpen = !this.dropdownOpen;
    }

    closeDropdown(): void {
        this.dropdownOpen = false;
    }

    isActive(path: string): boolean {
        if (path === '/') return this.router.url === '/';
        return this.router.url.startsWith(path);
    }

    logout(): void {
        this.authService.logout();
        this.dropdownOpen = false;
        this.closeMenu();
        this.router.navigate(['/']);
    }

    esAdminOEmpleado(): boolean {
        return this.authService.tieneRol('admin', 'empleado');
    }
}
