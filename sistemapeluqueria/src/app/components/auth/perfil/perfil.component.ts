import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService, Usuario } from '../../../services/auth.service';
import { CitaService } from '../../../services/cita.service';

@Component({
    selector: 'app-perfil',
    templateUrl: './perfil.component.html',
    styleUrls: ['./perfil.component.css'],
    standalone: false
})
export class PerfilComponent implements OnInit {
    usuario: Usuario | null = null;
    citas: any[] = [];
    cargandoCitas = false;

    constructor(
        private authService: AuthService,
        private citaService: CitaService,
        private router: Router
    ) {}

    ngOnInit(): void {
        this.usuario = this.authService.getUsuario();
        this.cargarCitas();
    }

    cargarCitas(): void {
        this.cargandoCitas = true;
        this.citaService.getCitas().subscribe({
            next: (citas) => {
                this.citas = citas;
                this.cargandoCitas = false;
            },
            error: () => { this.cargandoCitas = false; }
        });
    }

    cerrarSesion(): void {
        this.authService.logout();
        this.router.navigate(['/']);
    }

    getRolLabel(): string {
        const labels: Record<string, string> = {
            admin: 'Administrador',
            empleado: 'Empleado',
            cliente: 'Cliente'
        };
        return labels[this.usuario?.rol ?? 'cliente'] ?? 'Cliente';
    }

    getEstadoColor(estado: string): string {
        const colores: Record<string, string> = {
            pendiente: '#f59e0b',
            confirmada: '#10b981',
            cancelada: '#ef4444',
            completada: '#6b7280'
        };
        return colores[estado] ?? '#6b7280';
    }
}
