import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface Usuario {
    id: string;
    nombre: string;
    email: string;
    rol: 'admin' | 'empleado' | 'cliente';
    telefono?: string;
}

export interface AuthResponse {
    token: string;
    usuario: Usuario;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private apiUrl = `${environment.apiUrl}/api/auth`;
    private usuarioSubject = new BehaviorSubject<Usuario | null>(this.cargarUsuarioLocal());
    usuario$ = this.usuarioSubject.asObservable();

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password }).pipe(
            tap(res => this.guardarSesion(res))
        );
    }

    registrar(datos: { nombre: string; email: string; password: string; telefono?: string }): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(`${this.apiUrl}/registrar`, datos).pipe(
            tap(res => this.guardarSesion(res))
        );
    }

    perfil(): Observable<Usuario> {
        return this.http.get<Usuario>(`${this.apiUrl}/perfil`);
    }

    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        this.usuarioSubject.next(null);
    }

    getToken(): string | null {
        return localStorage.getItem('token');
    }

    isAuthenticated(): boolean {
        const token = this.getToken();
        if (!token) return false;
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > Date.now() / 1000;
        } catch {
            return false;
        }
    }

    getUsuario(): Usuario | null {
        return this.usuarioSubject.value;
    }

    getRol(): string | null {
        return this.usuarioSubject.value?.rol ?? null;
    }

    tieneRol(...roles: string[]): boolean {
        const rol = this.getRol();
        return rol ? roles.includes(rol) : false;
    }

    private guardarSesion(res: AuthResponse): void {
        localStorage.setItem('token', res.token);
        localStorage.setItem('usuario', JSON.stringify(res.usuario));
        this.usuarioSubject.next(res.usuario);
    }

    private cargarUsuarioLocal(): Usuario | null {
        try {
            const datos = localStorage.getItem('usuario');
            return datos ? JSON.parse(datos) : null;
        } catch {
            return null;
        }
    }
}
