import { Routes } from '@angular/router';
import { LoginAlumnoComponent } from './componentes/logins/login-alumno/login-alumno.component';
import { LoginEmpresaComponent } from './componentes/logins/login-empresa/login-empresa.component';
import { LoginProfesorComponent } from './componentes/logins/login-profesor/login-profesor.component';
import { MainLandingComponent } from './componentes/landing/main-landing/main-landing.component';
import { PoliticaPrivacidadComponent } from './componentes/politica-privacidad/politica-privacidad.component';
import { canActivate } from './security/authguard';
import { IndexComponent } from './componentes/indexs/index/index.component';
import { RegisterAlumnoComponent } from './componentes/registers/register-alumno/register-alumno.component';
import { RegisterEmpresaComponent } from './componentes/registers/register-empresa/register-empresa.component';
import { RegisterProfesorComponent } from './componentes/registers/register-profesor/register-profesor.component';
import { RegisterAdminComponent } from './componentes/registers/register-admin/register-admin.component';
import { RequestEmpresaComponent } from './componentes/registers/request-empresa/request-empresa.component';
import { ListTotalAlumnosComponent } from './componentes/listas-totales/list-total-alumnos/list-total-alumnos.component';
import { ListTotalProfesoresComponent } from './componentes/listas-totales/list-total-profesores/list-total-profesores.component';
import { ListTotalEmpresasComponent } from './componentes/listas-totales/list-total-empresas/list-total-empresas.component';
import { PerfilAlumnoComponent } from './componentes/perfiles/perfil-alumno/perfil-alumno.component';
import { CrearSolicitudComponent } from './componentes/solicitudes/crear-solicitud/crear-solicitud.component';
import { ListSolicitudesComponent } from './componentes/solicitudes/list-solicitudes/list-solicitudes.component';
import { PerfilEmpresaComponent } from './componentes/perfiles/perfil-empresa/perfil-empresa.component';
import { PerfilProfesorComponent } from './componentes/perfiles/perfil-profesor/perfil-profesor.component';
import { PerfilAdministradorComponent } from './componentes/perfiles/perfil-administrador/perfil-administrador.component';
import { AddIdiomaComponent } from './componentes/perfiles/perfil-alumno/add-idioma/add-idioma/add-idioma.component';
import { AddTecnologiaComponent } from './componentes/perfiles/perfil-empresa/add-tecnologia/add-tecnologia.component';
import { TutoriaComponent } from './componentes/tutoria/tutoria.component';
import { ListAlumnosInactivosComponent } from './componentes/list-inactivos/list-alumnos-inactivos/list-alumnos-inactivos.component';
import { ListEmpresasInactivosComponent } from './componentes/list-inactivos/list-empresas-inactivos/list-empresas-inactivos.component';
import { ListProfesoresInactivosComponent } from './componentes/list-inactivos/list-profesores-inactivos/list-profesores-inactivos.component';

export const routes: Routes = [
    {path:'', component:MainLandingComponent}, 
    {path:'login-alumno', component:LoginAlumnoComponent}, 
    {path:'login-empresa', component:LoginEmpresaComponent}, 
    {path:'login-profesor', component:LoginProfesorComponent}, 
    {path:'politica-privacidad', component:PoliticaPrivacidadComponent}, 
    {path:'index', component:IndexComponent,  canActivate: [canActivate]}, 
    {path:'register-alumno', component:RegisterAlumnoComponent,  canActivate: [canActivate]}, 
    {path:'register-empresa', component:RegisterEmpresaComponent,  canActivate: [canActivate]}, 
    {path:'register-profesor', component:RegisterProfesorComponent,  canActivate: [canActivate]}, 
    {path:'register-admin', component:RegisterAdminComponent,  canActivate: [canActivate]}, 
    {path:'request-empresa', component:RequestEmpresaComponent}, 
    {path: 'alumnos', component:ListTotalAlumnosComponent}, 
    {path: 'profesores', component:ListTotalProfesoresComponent}, 
    {path: 'empresas', component:ListTotalEmpresasComponent},
    {path: 'alumno/:id', component:PerfilAlumnoComponent},
    {path: 'solicitud/:id', component:CrearSolicitudComponent},
    {path: 'solicitudes', component:ListSolicitudesComponent},
    {path: 'empresa/:id', component:PerfilEmpresaComponent},
    {path: 'profesor/:id', component:PerfilProfesorComponent},
    {path: 'administrador/:id', component:PerfilAdministradorComponent},
    {path: 'addIdioma/:id', component:AddIdiomaComponent},
    {path: 'addTecnologia/:id', component:AddTecnologiaComponent},
    {path: 'tutoria/:id', component:TutoriaComponent},
    {path: 'alumnos-inact', component:ListAlumnosInactivosComponent},
    {path: 'empresas-inact', component:ListEmpresasInactivosComponent},
    {path: 'profesores-inact', component:ListProfesoresInactivosComponent}, 







    

];
