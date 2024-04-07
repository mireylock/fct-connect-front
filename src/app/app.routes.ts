import { Routes } from '@angular/router';
import { LoginAlumnoComponent } from './componentes/logins/login-alumno/login-alumno.component';
import { LoginEmpresaComponent } from './componentes/logins/login-empresa/login-empresa.component';
import { LoginProfesorComponent } from './componentes/logins/login-profesor/login-profesor.component';
import { MainLandingComponent } from './componentes/landing/main-landing/main-landing.component';
import { PoliticaPrivacidadComponent } from './componentes/politica-privacidad/politica-privacidad.component';
import { BienvenidaComponent } from './componentes/bienvenida/bienvenida.component';
import { canActivate } from './security/authguard';
import { IndexComponent } from './componentes/index/index.component';

export const routes: Routes = [
    {path:'', component:MainLandingComponent}, 
    {path:'login-alumno', component:LoginAlumnoComponent}, 
    {path:'login-empresa', component:LoginEmpresaComponent}, 
    {path:'login-profesor', component:LoginProfesorComponent}, 
    {path:'politica-privacidad', component:PoliticaPrivacidadComponent}, 
    {path:'index', component:IndexComponent,  canActivate: [canActivate]}, 

];
