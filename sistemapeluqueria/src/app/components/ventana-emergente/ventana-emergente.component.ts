import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Producto } from '../cuidados/cuidados.component';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent {
  compraRealizada: boolean = false;
  @Input() carrito: Producto[] = [];
  @Output() cerrarVentana: EventEmitter<void> = new EventEmitter<void>();
  @Output() reiniciarCarrito: EventEmitter<void> = new EventEmitter<void>();

  calcularTotal(): number {
    return this.carrito.reduce((sum, producto) => sum + producto.precio, 0);
  }

  formatearPrecioProducto(precio: number): string {
    return precio.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

  cerrar(): void {
    this.reiniciarCarrito.emit();
    this.cerrarVentana.emit();
  }

  close(): void {
    this.cerrarVentana.emit();
  }

  realizarCompra(): void {
    // Lógica de compra
    this.simularProcesoDeCompra();
  }

  simularProcesoDeCompra(): void {
    // Simulación de la lógica de compra con una demora ficticia de 2 segundos
    setTimeout(() => {
      // Vaciar el carrito
      this.carrito = [];

      // Mostrar mensaje de compra realizada
      this.mostrarMensajeCompra();

      // Cerrar la ventana después de la compra (puedes ajustar según tu flujo)
      setTimeout(() => {
        this.cerrar();
      }, 3000); // Ocultar el mensaje después de 3 segundos (puedes ajustar el tiempo)
    }, 2000); // Demora ficticia de 2 segundos (puedes ajustar el tiempo)
  }

  mostrarMensajeCompra(): void {
    this.compraRealizada = true;
  }
}
