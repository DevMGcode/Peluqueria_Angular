import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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
        const esStaff = this.authService.tieneRol('admin', 'empleado');
        const peticion = esStaff ? this.citaService.getCitas() : this.citaService.getMisCitas();
        peticion.subscribe({
            next: (citas) => {
                this.citas = citas;
                this.cargandoCitas = false;
            },
            error: () => { this.cargandoCitas = false; }
        });
    }

    puedeCancelar(cita: any): boolean {
        const estado = cita.estado || 'pendiente';
        return estado === 'pendiente' || estado === 'confirmada';
    }

    cancelarCita(cita: any): void {
        Swal.fire({
            icon: 'warning',
            title: '¿Cancelar esta cita?',
            html: `<span style="font-family:'Poppins',sans-serif;font-size:0.88rem;color:rgba(250,248,246,0.65)">${cita.motivo} · ${cita.fecha} a las ${cita.hora}</span>`,
            background: '#0e0b08',
            color: '#faf8f6',
            iconColor: '#f59e0b',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Sí, cancelar',
            cancelButtonText: 'No, mantener'
        }).then(result => {
            if (!result.isConfirmed) return;
            this.citaService.cancelarCita(cita._id).subscribe({
                next: (citaActualizada) => {
                    cita.estado = citaActualizada.estado;
                    Swal.fire({
                        icon: 'success',
                        title: 'Cita cancelada',
                        background: '#0e0b08',
                        color: '#faf8f6',
                        iconColor: '#d4af37',
                        timer: 2000,
                        showConfirmButton: false
                    });
                },
                error: (err) => {
                    Swal.fire({
                        icon: 'error',
                        title: 'No se pudo cancelar',
                        text: err.error?.msg || 'Inténtalo de nuevo.',
                        background: '#0e0b08',
                        color: '#faf8f6',
                        confirmButtonColor: '#d4af37'
                    });
                }
            });
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
