import { Routes } from '@angular/router';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { GestionNegociosComponent } from './componentes/gestion-negocios/gestion-negocios.component';
import { CrearNegocioComponent } from './componentes/crear-negocio/crear-negocio.component';
import { DetalleNegocioComponent } from './componentes/detalle-negocio/detalle-negocio.component';
import { BusquedaComponent } from './componentes/busqueda/busqueda.component';
import { LoginGuard } from './servicios/permiso.service';
import { GestionNegocioAdminComponent } from './componentes/gestion-negocio-admin/gestion-negocio-admin.component';
import { RolesGuard } from './servicios/roles.service';

export const routes: Routes = [
    { path: '', component: InicioComponent },
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'registro', component: RegistroComponent, canActivate: [LoginGuard] },
    { path: "gestion-negocios", component: GestionNegociosComponent, canActivate: [RolesGuard],
    data: { expectedRole: ["CLIENTE"] } },
    { path: "crear-negocio", component: CrearNegocioComponent, canActivate: [RolesGuard], data: {
    expectedRole: ["CLIENTE"] } },
    { path: "gestio-negocios-admin", component: GestionNegocioAdminComponent, canActivate:
    [RolesGuard], data: { expectedRole: ["MODERADOR"] } },
    { path: "detalle-negocio/:codigo", component: DetalleNegocioComponent },
    { path: "busqueda/:texto", component: BusquedaComponent },

    { path: "**", pathMatch: "full", redirectTo: "" },

];