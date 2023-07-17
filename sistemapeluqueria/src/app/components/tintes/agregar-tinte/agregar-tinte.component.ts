import { Component, OnInit } from '@angular/core';
import { Form, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Tinte } from 'src/app/models/tinte';
import { TinteService } from 'src/app/services/tinte.service';

@Component({
  selector: 'app-agregar-tinte',
  templateUrl: './agregar-tinte.component.html',
  styleUrls: ['./agregar-tinte.component.css'],
})
export class AgregarTinteComponent implements OnInit {
  tinteForm: UntypedFormGroup;
  titulo_formulario = 'Agregar Tinte';
  id: string | null;

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _tinteService: TinteService,
    private idRoute: ActivatedRoute
  ) {
    this.tinteForm = this.fb.group({
      tinteColor: ['', [Validators.required]],
      tinteNumero: ['', Validators.required],
      tinteCategoria: ['', Validators.required],
    });

    this.id = this.idRoute.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.accionSolicitada();
  }

  /* metodo de agregar */
  manipulacion_data_tinte() {
    console.log(this.tinteForm);
    /* console.log(this.tinteForm.get('tinteColor')?.value); */

    const TINTE: Tinte = {
      color: this.tinteForm.get('tinteColor')?.value,
      numero: this.tinteForm.get('tinteNumero')?.value,
      categoria: this.tinteForm.get('tinteCategoria')?.value,
    };

    console.log(TINTE);

    if (this.id != null) {
      //editar tinte
      this._tinteService.putTinte(this.id, TINTE).subscribe(
        (data) => {
          this.router.navigate(['listar-tinte']);
          Swal.fire({
            icon: 'success',
            title: 'tinte ha sido actualizado!',
          });
        },
        (error) => {
          console.log(error);
        }
      );
    } else {
      // creamos tinte
      this._tinteService.postTintes(TINTE).subscribe(
        (data) => {
          this.router.navigate(['listar-tinte']);
          Swal.fire({
            icon: 'success',
            title: 'tinte agregado!',
          });
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }

  accionSolicitada() {
    //editamos tinte
    if (this.id != null) {
      this.titulo_formulario = 'Editar Tinte';
      this._tinteService.getTinte(this.id).subscribe((data) => {
        this.tinteForm.setValue({
          tinteColor: data.color,
          tinteNumero: data.numero,
          tinteCategoria: data.categoria,
        });
      });
    }
  }
}
