import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InicioComponent } from './components/inicio/inicio.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { AgregarTinteComponent } from './components/tintes/agregar-tinte/agregar-tinte.component';
import { ListarTinteComponent } from './components/tintes/listar-tinte/listar-tinte.component';
import { AgendarCitasComponent } from './components/inicio/agendar-citas/agendar-citas.component';
import { PeinadosComponent } from './components/peinados/peinados.component';
import { CortesComponent } from './components/cortes/cortes.component';
import { TintesComponent } from './components/tintes/tintes.component';
import { CuidadosComponent } from './components/cuidados/cuidados.component';
import { MaquillajeComponent } from './components/maquillaje/maquillaje.component';

// Auth
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { PerfilComponent } from './components/auth/perfil/perfil.component';

// Guards
import { AuthGuard } from './guards/auth.guard';
import { RolGuard } from './guards/rol.guard';

const routes: Routes = [
    // Públicas
    { path: '', component: InicioComponent },
    { path: 'peinados', component: PeinadosComponent },
    { path: 'cortes', component: CortesComponent },
    { path: 'tintes', component: TintesComponent },
    { path: 'cuidados', component: CuidadosComponent },
    { path: 'maquillaje', component: MaquillajeComponent },
    { path: 'reservar-cita', component: InicioComponent },
    { path: 'reagendarse/:id', component: InicioComponent },

    // Auth
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'perfil', component: PerfilComponent, canActivate: [AuthGuard] },

    // Solo admin y empleado
    {
        path: 'agendar-citas', component: AgendarCitasComponent,
        canActivate: [AuthGuard, RolGuard],
        data: { roles: ['admin', 'empleado'] }
    },
    {
        path: 'listar-tinte', component: ListarTinteComponent,
        canActivate: [AuthGuard, RolGuard],
        data: { roles: ['admin', 'empleado'] }
    },
    {
        path: 'agregar-tinte', component: AgregarTinteComponent,
        canActivate: [AuthGuard, RolGuard],
        data: { roles: ['admin', 'empleado'] }
    },
    {
        path: 'editar-tinte/:id', component: AgregarTinteComponent,
        canActivate: [AuthGuard, RolGuard],
        data: { roles: ['admin', 'empleado'] }
    },

    // Error
    { path: '404', component: Pagina404Component },
    { path: '**', redirectTo: '404', pathMatch: 'full' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { anchorScrolling: 'enabled', scrollOffset: [0, 80] })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
