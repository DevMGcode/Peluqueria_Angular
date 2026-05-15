import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi, HTTP_INTERCEPTORS } from '@angular/common/http';

// Angular Material v19 (MDC-based)
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { MatDividerModule } from '@angular/material/divider';

// Angular CDK
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { OverlayModule } from '@angular/cdk/overlay';

// Routing
import { AppRoutingModule } from './app-routing.module';

// Componentes existentes
import { AppComponent } from './app.component';
import { CortesComponent } from './components/cortes/cortes.component';
import { CuidadosComponent } from './components/cuidados/cuidados.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { MaquillajeComponent } from './components/maquillaje/maquillaje.component';
import { PeinadosComponent } from './components/peinados/peinados.component';
import { TintesComponent } from './components/tintes/tintes.component';
import { AgregarTinteComponent } from './components/tintes/agregar-tinte/agregar-tinte.component';
import { ListarTinteComponent } from './components/tintes/listar-tinte/listar-tinte.component';
import { Pagina404Component } from './components/pagina404/pagina404.component';
import { AgendarCitasComponent } from './components/inicio/agendar-citas/agendar-citas.component';
import { BarradenavegacionComponent } from './components/barradenavegacion/barradenavegacion.component';
import { PiedepaginaComponent } from './components/piedepagina/piedepagina.component';
import { VentanaEmergenteComponent } from './components/ventana-emergente/ventana-emergente.component';

// Nuevos componentes de autenticación (Fase 1)
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { PerfilComponent } from './components/auth/perfil/perfil.component';

// Interceptor de autenticación
import { AuthInterceptor } from './interceptors/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        CortesComponent,
        CuidadosComponent,
        InicioComponent,
        MaquillajeComponent,
        PeinadosComponent,
        TintesComponent,
        AgregarTinteComponent,
        ListarTinteComponent,
        Pagina404Component,
        AgendarCitasComponent,
        BarradenavegacionComponent,
        PiedepaginaComponent,
        VentanaEmergenteComponent,
        // Auth
        LoginComponent,
        RegistroComponent,
        PerfilComponent,
    ],
    imports: [
        BrowserModule,
        CommonModule,
        BrowserAnimationsModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        // Material v19
        MatDatepickerModule,
        MatNativeDateModule,
        MatInputModule,
        MatFormFieldModule,
        MatButtonModule,
        MatIconModule,
        MatMenuModule,
        MatDialogModule,
        MatSnackBarModule,
        MatTabsModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatProgressSpinnerModule,
        MatTooltipModule,
        MatAutocompleteModule,
        MatCardModule,
        MatChipsModule,
        MatBadgeModule,
        MatDividerModule,
        // CDK
        DragDropModule,
        ScrollingModule,
        OverlayModule,
    ],
    providers: [
        provideHttpClient(withInterceptorsFromDi()),
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
