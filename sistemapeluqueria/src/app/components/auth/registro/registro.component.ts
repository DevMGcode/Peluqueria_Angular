import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css'],
    standalone: false
})
export class RegistroComponent implements OnInit {
    registroForm!: FormGroup;
    cargando = false;
    errorMsg = '';
    mostrarPassword = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
        this.registroForm = this.fb.group({
            nombre: ['', [Validators.required, Validators.minLength(2)]],
            email: ['', [Validators.required, Validators.email]],
            telefono: [''],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    onSubmit(): void {
        if (this.registroForm.invalid) return;
        this.cargando = true;
        this.errorMsg = '';

        this.authService.registrar(this.registroForm.value).subscribe({
            next: () => {
                this.cargando = false;
                this.router.navigate(['/']);
            },
            error: (err) => {
                this.cargando = false;
                this.errorMsg = err.error?.msg || 'Error al crear la cuenta.';
            }
        });
    }

    get nombre() { return this.registroForm.get('nombre'); }
    get email() { return this.registroForm.get('email'); }
    get password() { return this.registroForm.get('password'); }
}
