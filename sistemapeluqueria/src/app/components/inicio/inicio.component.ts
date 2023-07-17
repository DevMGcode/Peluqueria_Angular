import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { cita } from 'src/app/models/cita';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css'],
})
export class InicioComponent implements OnInit {

  citaForm: UntypedFormGroup;
  titulo_form = 'Agenda tu cita';
  id: string | null;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _citaService: CitaService,
    private idRoute: ActivatedRoute
  ) {
    this.citaForm = this.fb.group({
      citaNombre: ['', [Validators.required]],
      citaFecha: ['', Validators.required],
      citaHora: ['', Validators.required],
      citaMotivo: ['', Validators.required],
    });

    this.id = this.idRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.accionSolicity();
  }

  //ventana con mensaje una vez se oprima el boton
  agrecita() {
    console.log(this.citaForm);

    const CITA: cita = {
      nombre: this.citaForm.get('citaNombre')?.value,
      fecha: this.citaForm.get('citaFecha')?.value,
      hora: this.citaForm.get('citaHora')?.value,
      motivo: this.citaForm.get('citaMotivo')?.value,
    };

    console.log(CITA);

    if(this.id!==null){
      //editamos cita
      this._citaService.putCita(this.id,CITA).subscribe(
        (data) => {
          this.router.navigate(['agendar-citas']);
          Swal.fire({
            icon: 'success',
            title: 'Su Cita ha sido ReAgendada!',
          });
        },
        (error) => {
          console.log(error);
        })
    }else{
      //creamos cita
    this._citaService.postCitas(CITA).subscribe(
      (data) => {
        this.router.navigate(['agendar-citas']);
        Swal.fire({
          icon: 'success',
          title: 'Cita Agendada!',
        });
      },
      (error) => {
        console.log(error);
      });
    }

  }

  accionSolicity() {
    if (this.id != null) {
      //editar producto
      this.titulo_form = 'Re-agendar tu cita ';
      this._citaService.getCita(this.id).subscribe(data => {
        this.citaForm.setValue({

          citaNombre: data.nombre,
          citaFecha: data.fecha,
          citaHora: data.hora,
          citaMotivo: data.motivo

          })
      })
    }
  }
}
