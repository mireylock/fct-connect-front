import { Component, OnInit } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormularioInicioSesionComponent } from '../formulario-inicio-sesion/formulario-inicio-sesion.component';

@Component({
  selector: 'app-login-alumno',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, FormularioInicioSesionComponent],
  templateUrl: './login-alumno.component.html',
  styleUrl: './login-alumno.component.scss'
})
export class LoginAlumnoComponent {
    
}
