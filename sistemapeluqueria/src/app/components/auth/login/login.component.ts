import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: false
})
export class LoginComponent implements OnInit {
    loginForm!: FormGroup;
    cargando = false;
    errorMsg = '';
    mostrarPassword = false;
    shake = false;

    orbs = Array.from({ length: 12 }, () => ({
        size:  `${Math.random() * 120 + 30}px`,
        x:     `${Math.random() * 100}%`,
        y:     `${Math.random() * 100}%`,
        dur:   `${Math.random() * 10 + 8}s`,
        delay: `-${Math.random() * 10}s`
    }));

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {}

    ngOnInit(): void {
        if (this.authService.isAuthenticated()) {
            this.router.navigate(['/']);
        }
        const emailGuardado = localStorage.getItem('login_email') ?? '';
        this.loginForm = this.fb.group({
            email:    [emailGuardado, [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            recordar: [!!emailGuardado]
        });
    }

    onSubmit(): void {
        if (this.loginForm.invalid) {
            this.loginForm.markAllAsTouched();
            this.triggerShake();
            return;
        }
        this.cargando = true;
        this.errorMsg = '';

        const { email, password, recordar } = this.loginForm.value;

        this.authService.login(email, password).subscribe({
            next: () => {
                this.cargando = false;
                if (recordar) {
                    localStorage.setItem('login_email', email);
                } else {
                    localStorage.removeItem('login_email');
                }
                const rol = this.authService.getRol();
                if (rol === 'admin' || rol === 'empleado') {
                    this.router.navigate(['/agendar-citas']);
                } else {
                    this.router.navigate(['/']);
                }
            },
            error: (err) => {
                this.cargando = false;
                this.errorMsg = err.error?.msg || 'Credenciales incorrectas. Verifica tu email y contraseña.';
                this.triggerShake();
            }
        });
    }

    private triggerShake(): void {
        this.shake = true;
        setTimeout(() => (this.shake = false), 600);
    }

    get email()    { return this.loginForm.get('email'); }
    get password() { return this.loginForm.get('password'); }
}
