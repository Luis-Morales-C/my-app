import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component'; 
import { LoginGuard } from './permiso.service';



export const routes: Routes = [
{ path: '', component: InicioComponent },
{ path: 'login', component: LoginComponent },
{ path: 'registro', component: RegistroComponent },
{ path: "gestion-negocios", component: GestionNegociosComponent },
{ path: "crear-negocio", component: CrearNegocioComponent },
{ path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
{ path: "busqueda/:texto", component: BusquedaComponent},
{ path: "**", pathMatch: "full", redirectTo: "" },
{ path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
{ path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },


];