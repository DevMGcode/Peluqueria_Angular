import { Component, Input , Output, EventEmitter} from '@angular/core';
import { Producto } from '../cuidados/cuidados.component';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent {
  @Input() carrito: Producto[] = [];
  @Output() cerrarVentana: EventEmitter<void> = new EventEmitter<void>(); // Evento para cerrar la ventana
  // Función para calcular el total del carrito
  calcularTotal(): number {
    return this.carrito.reduce((sum, producto) => sum + producto.precio, 0);
  }

  // Función para formatear el precio individual de cada producto
  formatearPrecioProducto(precio: number): string {
    return precio.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    });
  }

    // Función para cerrar la ventana emergente
    cerrar(): void {
      this.cerrarVentana.emit(); // Emite el evento para indicar que se debe cerrar la ventana
    }
}

