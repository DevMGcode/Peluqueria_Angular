import { Component} from '@angular/core';

@Component({
  selector: 'app-cuidados',
  templateUrl: './cuidados.component.html',
  styleUrls: ['./cuidados.component.css']
})
export class CuidadosComponent {

  mostrarDescripcion1: boolean = false;
  mostrarDescripcion2: boolean = false;
  mostrarDescripcion3: boolean = false;
  mostrarDescripcion4: boolean = false;
  precio1: number = 35000; // Precio en pesos colombianos
  precio2: number = 29000; // Precio en pesos colombianos
  precio3: number = 40000;
  precio4: number = 35000;
  // Propiedades para precios formateados
  precioFormateado1: string ='';
  precioFormateado2: string ='';
  precioFormateado3: string ='';
  precioFormateado4: string ='';

  // Función para formatear el precio con un punto como separador de miles
  formatearPrecio(precio: number): string {
    return precio.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  // Función para inicializar los precios formateados
  inicializarPreciosFormateados(): void {
    this.precioFormateado1 = this.formatearPrecio(this.precio1);
    this.precioFormateado2 = this.formatearPrecio(this.precio2);
    this.precioFormateado3 = this.formatearPrecio(this.precio3);
    this.precioFormateado4 = this.formatearPrecio(this.precio4);
  }

  // Método ngOnInit para inicializar los precios formateados al cargar el componente
  ngOnInit(): void {
    this.inicializarPreciosFormateados();
  }

  toggleDescripcion() {
    this.mostrarDescripcion1 = !this.mostrarDescripcion1;
    this.mostrarDescripcion2 = !this.mostrarDescripcion2;
    this.mostrarDescripcion3 = !this.mostrarDescripcion3;
    this.mostrarDescripcion4 = !this.mostrarDescripcion4;
  }


}
