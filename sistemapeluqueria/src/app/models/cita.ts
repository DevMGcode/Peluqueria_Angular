export class cita{
_id?:number;
nombre:string;
fecha:string;
hora:string;
motivo:string;


/* el metodo contructor se va ejecutar automaticamente cuando se llama dicha clase en algun
    componente o logica
 */

    constructor (nombre:string,fecha:string,hora:string,motivo:string){
      this.nombre = nombre;
      this.fecha = fecha;
      this.hora=hora;
      this.motivo = motivo;
    }

}
