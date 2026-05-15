import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../cuidados/cuidados.component';

@Component({
    selector: 'app-ventana-emergente',
    templateUrl: './ventana-emergente.component.html',
    styleUrls: ['./ventana-emergente.component.css'],
    standalone: false
})
export class VentanaEmergenteComponent {
  compraRealizada = false;
  isLoading = false;

  @Input()  carrito: Producto[] = [];
  @Output() cerrarVentana   = new EventEmitter<void>();
  @Output() reiniciarCarrito = new EventEmitter<void>();

  calcularTotal(): number {
    return this.carrito.reduce((sum, p) => sum + p.precio, 0);
  }

  formatearPrecioProducto(precio: number): string {
    return precio.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  }

  close(): void {
    this.cerrarVentana.emit();
  }

  cerrar(): void {
    this.reiniciarCarrito.emit();
    this.cerrarVentana.emit();
  }

  realizarCompra(): void {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.carrito = [];
      this.compraRealizada = true;
      setTimeout(() => this.cerrar(), 3200);
    }, 2000);
  }
}
