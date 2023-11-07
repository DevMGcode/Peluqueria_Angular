import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Producto {
  id: number;
  nombre: string;
  precio: number;
  descripcion: string;
  mostrarDescripcion: boolean;
}


@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.component.html',
  styleUrls: ['./cuidados.component.css']
})
export class CuidadosComponent implements OnInit {
  productos: Producto[] = [];
  carrito: Producto[] = []; // Lista para almacenar productos en el carrito
  mostrarVentanaEmergente: boolean = false; // Propiedad para controlar la visibilidad de la ventana emergente

    // Función para abrir la ventana emergente
    abrirVentanaEmergente(): void {
      this.mostrarVentanaEmergente = true;
    }

    // Función para cerrar la ventana emergente
    cerrarVentanaEmergente(): void {
      this.mostrarVentanaEmergente = false;
    }

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<Producto[]>('assets/productos.json').subscribe(data => {
      this.productos = data.map(producto => ({ ...producto, mostrarDescripcion: false }));
    });
  }

  toggleDescripcion(index: number, mostrar: boolean): void {
    this.productos[index].mostrarDescripcion = mostrar;
  }

  // Función para formatear el precio
  formatearPrecio(precio: number): string {
    const precioFormateado = precio.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    return `$ ${precioFormateado}`;
  }





  // Función para añadir productos al carrito
  // agregarAlCarrito(producto: Producto): void {
  //   this.carrito.push(producto);
  // }

  // Función para añadir productos al carrito
  agregarAlCarrito(producto: Producto): void {
    this.carrito.push(producto);
    this.mostrarVentanaEmergente = true; // Mostrar la ventana emergente después de agregar al carrito
  }


}
