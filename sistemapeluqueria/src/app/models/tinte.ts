export class Tinte{
  _id?: number;
  color:string;
  numero: string;
  categoria:string;


/* el metodo contructor se va ejecutar automaticamente cuando se llama dicha clase en algun
    componente o logica
 */

    constructor (color:string,numero:string,categoria:string){
      this.color = color;
      this.numero = numero;
      this.categoria = categoria;
    }
}
