import { Routes } from '@angular/router';
import { LoginAlumnoComponent } from './componentes/logins/login-alumno/login-alumno.component';
import { LoginEmpresaComponent } from './componentes/logins/login-empresa/login-empresa.component';
import { LoginProfesorComponent } from './componentes/logins/login-profesor/login-profesor.component';
import { MainLandingComponent } from './componentes/landing/main-landing/main-landing.component';
import { PoliticaPrivacidadComponent } from './componentes/politica-privacidad/politica-privacidad.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { canActivate } from './security/authguard';
import { IndexComponent } from './componentes/indexs/index/index.component';
import { RegisterAlumnoComponent } from './componentes/registers/register-alumno/register-alumno.component';
import { RegisterEmpresaComponent } from './componentes/registers/register-empresa/register-empresa.component';
import { RegisterProfesorComponent } from './componentes/registers/register-profesor/register-profesor.component';
import { RegisterAdminComponent } from './componentes/registers/register-admin/register-admin.component';
import { RequestEmpresaComponent } from './componentes/registers/request-empresa/request-empresa.component';
import { ListTotalAlumnosComponent } from './componentes/listas-totales/list-total-alumnos/list-total-alumnos.component';
import { ListParcialProfesoresComponent } from './componentes/listas-parciales/list-parcial-profesores/list-parcial-profesores.component';
import { ListTotalProfesoresComponent } from './componentes/listas-totales/list-total-profesores/list-total-profesores.component';
import { ListParcialEmpresasComponent } from './componentes/listas-parciales/list-parcial-empresas/list-parcial-empresas.component';
import { ListTotalEmpresasComponent } from './componentes/listas-totales/list-total-empresas/list-total-empresas.component';

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
    {path: 'empresas', component:ListTotalEmpresasComponent}

];
