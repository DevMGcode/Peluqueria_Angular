import { Component, OnInit } from '@angular/core';
import { cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agendar-citas',
  templateUrl: './agendar-citas.component.html',
  styleUrls: ['./agendar-citas.component.css']
})
export class AgendarCitasComponent implements OnInit {

  agendadoCitas: cita[] = [];

  constructor(private _citaService: CitaService) {}

  ngOnInit(): void {
    this.obtenerCitas();
  }

  obtenerCitas(): void {
    this._citaService.getCitas().subscribe(
      data  => { this.agendadoCitas = data; },
      error => { console.log(error); }
    );
  }

  formatearHora(hora: string): string {
    if (!hora) return '';
    const [h, m] = hora.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const h12    = h % 12 || 12;
    return `${h12}:${m.toString().padStart(2, '0')} ${period}`;
  }

  formatearFecha(fecha: string): string {
    if (!fecha) return '';
    const meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
    const [y, m, d] = fecha.split('-');
    return `${parseInt(d)} ${meses[parseInt(m) - 1]} ${y}`;
  }

  getIconoServicio(motivo: string): string {
    if (!motivo) return 'fas fa-spa';
    const m = motivo.toLowerCase();
    if (m.includes('peinado') || m.includes('peinados')) return 'fas fa-paint-brush';
    if (m.includes('tinte')   || m.includes('color'))    return 'fas fa-palette';
    if (m.includes('corte')   || m.includes('cortes'))   return 'fas fa-cut';
    if (m.includes('maquillaje'))                         return 'fas fa-magic';
    if (m.includes('cuidado') || m.includes('tratamiento')) return 'fas fa-leaf';
    return 'fas fa-spa';
  }

  eliminarCita(id: any): void {
    Swal.fire({
      title: '¿Eliminar esta cita?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d4af37',
      cancelButtonColor:  '#c9748f',
      confirmButtonText:  'Sí, eliminar',
      cancelButtonText:   'Cancelar',
      background: '#0e0b08',
      color: '#faf8f6',
      iconColor: '#c9748f'
    }).then(result => {
      if (result.isConfirmed) {
        this._citaService.deleteCita(id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Cita eliminada!',
              confirmButtonColor: '#d4af37',
              background: '#0e0b08',
              color: '#faf8f6',
              iconColor: '#d4af37',
              timer: 2000,
              showConfirmButton: false
            });
            this.obtenerCitas();
          },
          error => console.log(error)
        );
      }
    });
  }
}
