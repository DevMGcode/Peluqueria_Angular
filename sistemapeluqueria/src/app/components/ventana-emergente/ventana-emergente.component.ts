import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ventana-emergente',
  templateUrl: './ventana-emergente.component.html',
  styleUrls: ['./ventana-emergente.component.css']
})
export class VentanaEmergenteComponent {
  @Input() nombreTarjeta: string = '';
  @Input() precio: string = '';
  @Output() cerrarVentana: EventEmitter<void> = new EventEmitter<void>();

  cerrar(): void {
    this.cerrarVentana.emit();
  }
}

