import { Component, OnInit } from '@angular/core';
import { Tinte } from 'src/app/models/tinte';
import { TinteService } from 'src/app/services/tinte.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar-tinte',
  templateUrl: './listar-tinte.component.html',
  styleUrls: ['./listar-tinte.component.css']
})
export class ListarTinteComponent implements OnInit {
//llamar los metodos para hacer las respectiva funcionalidad

  listadoTintes:Tinte[]=[]

  constructor(private _tinteService:TinteService) { }

  ngOnInit(): void {
    this.obtenerTintes();
  }

  obtenerTintes(){
    this._tinteService.getTintes().subscribe(data => {
      //console.log(data)
      this.listadoTintes = data;
    }, error => {
    console.log(error)
    })
  }

  eliminarTinte(id: any){

    Swal.fire({


      title: 'Esta seguro de eliminar el tinte?',
      text: "esta accion no sera reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',

    }).then((result) => {
      if (result.isConfirmed) {
        this._tinteService.deleteTinte(id).subscribe(data =>{
          Swal.fire({
            icon: 'success',
            title: 'Tinte Eliminado!'

          })
          this.obtenerTintes();
        },error =>{
          console.log(error)
        } )

      }
    })

  }

}
