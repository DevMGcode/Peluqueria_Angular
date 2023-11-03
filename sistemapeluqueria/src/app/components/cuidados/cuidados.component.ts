import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Producto {
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
    const precioRedondeado = precio.toFixed(0);
    return '$ ' + precioRedondeado.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.');
  }

  agregarAlCarrito(nombre: string, precio: number): void {
    // Lógica para agregar el producto al carrito
  }
}


