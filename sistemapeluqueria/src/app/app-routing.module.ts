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


const routes: Routes = [

  {path:'',component:InicioComponent},
  {path:'peinados',component:PeinadosComponent},
  {path:'cortes',component:CortesComponent},
  {path:'tintes',component:TintesComponent},
  {path:'cuidados',component:CuidadosComponent},
  {path:'maquillaje',component:MaquillajeComponent},

  {path:'listar-tinte',component:ListarTinteComponent},
  {path:'agregar-tinte', component:AgregarTinteComponent},
  {path:'editar-tinte/:id', component:AgregarTinteComponent},
  {path:'agendar-citas', component:AgendarCitasComponent},
  {path:'reservar-cita',component:InicioComponent},
  {path:'reagendarse/:id',component:InicioComponent},

  {path:'404',component:Pagina404Component},
  {path:'**',redirectTo: '404',pathMatch: 'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
