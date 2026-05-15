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
    standalone: false
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
    const TINTE: Tinte = {
      color:     this.tinteForm.get('tinteColor')?.value,
      numero:    this.tinteForm.get('tinteNumero')?.value,
      categoria: this.tinteForm.get('tinteCategoria')?.value,
    };

    if (this.id != null) {
      this._tinteService.putTinte(this.id, TINTE).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: '¡Tinte actualizado!',
            html: `<span style="font-family:'Poppins',sans-serif;font-size:0.88rem;color:rgba(250,248,246,0.65)">Los cambios han sido guardados correctamente</span>`,
            background: '#0e0b08',
            color: '#faf8f6',
            iconColor: '#d4af37',
            confirmButtonColor: '#d4af37',
            timer: 2400,
            showConfirmButton: false,
            timerProgressBar: true
          }).then(() => this.router.navigate(['listar-tinte']));
        },
        error => console.log(error)
      );
    } else {
      this._tinteService.postTintes(TINTE).subscribe(
        () => {
          Swal.fire({
            icon: 'success',
            title: '¡Tinte agregado!',
            html: `<span style="font-family:'Poppins',sans-serif;font-size:0.88rem;color:rgba(250,248,246,0.65)">El tinte ha sido registrado en el catálogo</span>`,
            background: '#0e0b08',
            color: '#faf8f6',
            iconColor: '#d4af37',
            confirmButtonColor: '#d4af37',
            timer: 2400,
            showConfirmButton: false,
            timerProgressBar: true
          }).then(() => this.router.navigate(['listar-tinte']));
        },
        error => console.log(error)
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
