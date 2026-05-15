import { Component, OnInit, HostListener } from '@angular/core';
import { Tinte } from 'src/app/models/tinte';
import { TinteService } from 'src/app/services/tinte.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-listar-tinte',
    templateUrl: './listar-tinte.component.html',
    styleUrls: ['./listar-tinte.component.css'],
    standalone: false
})
export class ListarTinteComponent implements OnInit {
//llamar los metodos para hacer las respectiva funcionalidad

  listadoTintes: Tinte[] = [];

  lightboxOpen = false;
  lensVisible  = false;
  lensStyle: { [key: string]: string } = {};

  private readonly ZOOM = 2.8;

  constructor(private _tinteService: TinteService) {}

  ngOnInit(): void {
    this.obtenerTintes();
  }

  openLightbox(): void {
    this.lightboxOpen = true;
    document.body.style.overflow = 'hidden';
  }

  closeLightbox(): void {
    this.lightboxOpen = false;
    this.lensVisible  = false;
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeLightbox(); }

  onZoomMove(e: MouseEvent, wrap: HTMLElement): void {
    const img  = wrap.querySelector('img') as HTMLImageElement;
    if (!img) return;
    const rect = img.getBoundingClientRect();
    const x    = e.clientX - rect.left;
    const y    = e.clientY - rect.top;
    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      this.lensVisible = false;
      return;
    }
    this.lensVisible = true;
    const lensW = 180;
    const lensH = 120;
    const bgX   = (x / rect.width)  * 100;
    const bgY   = (y / rect.height) * 100;
    this.lensStyle = {
      left:                 (x - lensW / 2) + 'px',
      top:                  (y - lensH / 2) + 'px',
      width:                lensW + 'px',
      height:               lensH + 'px',
      backgroundImage:      `url(assets/img/CartaIGORA.png)`,
      backgroundSize:       (rect.width * this.ZOOM) + 'px ' + (rect.height * this.ZOOM) + 'px',
      backgroundPosition:   `${bgX}% ${bgY}%`,
    };
  }

  onZoomLeave(): void {
    this.lensVisible = false;
  }

  obtenerTintes(){
    this._tinteService.getTintes().subscribe(data => {
      //console.log(data)
      this.listadoTintes = data;
    }, error => {
    console.log(error)
    })
  }

  eliminarTinte(id: any) {
    Swal.fire({
      title: '¿Eliminar este tinte?',
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
        this._tinteService.deleteTinte(id).subscribe(
          () => {
            Swal.fire({
              icon: 'success',
              title: '¡Tinte eliminado!',
              background: '#0e0b08',
              color: '#faf8f6',
              iconColor: '#d4af37',
              confirmButtonColor: '#d4af37',
              timer: 2000,
              showConfirmButton: false
            });
            this.obtenerTintes();
          },
          error => console.log(error)
        );
      }
    });
  }

}
