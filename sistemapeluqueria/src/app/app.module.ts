import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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

import{HttpClientModule }from '@angular/common/http';
import { BarradenavegacionComponent } from './components/barradenavegacion/barradenavegacion.component';
import { PiedepaginaComponent } from './components/piedepagina/piedepagina.component';
import { VentanaEmergenteComponent } from './components/ventana-emergente/ventana-emergente.component';

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
    VentanaEmergenteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
