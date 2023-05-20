import { Component, OnInit } from '@angular/core';
import { cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-agendar-citas',
  templateUrl: './agendar-citas.component.html',
  styleUrls: ['./agendar-citas.component.css']
})
export class AgendarCitasComponent implements OnInit {

  agendadoCitas:cita[]=[] //devolver la info por una variable

  constructor(private _citaService:CitaService) { }

  ngOnInit(): void {

    this.obtenerCitas();

  }

  obtenerCitas(){
    this._citaService.getCitas().subscribe(data=>{

     // console.log(data)
     this.agendadoCitas=data;
    }, error=>{

      console.log(error)
    })
  }

  eliminarCita(id: any){

    Swal.fire({


      title: 'Esta seguro de eliminar la cita de la agenda?',
      text: "esta accion no sera reversible",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar',

    }).then((result) => {
      if (result.isConfirmed) {
        this._citaService.deleteCita(id).subscribe(data =>{
          Swal.fire({
            icon: 'success',
            title: 'Cita Eliminado!'

          })
          this.obtenerCitas();
        },error =>{
          console.log(error)
        } )

      }
    })

  }

}
