import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormularioInicioSesionComponent } from '../formulario-inicio-sesion/formulario-inicio-sesion.component';

@Component({
  selector: 'app-login-profesor',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, FormularioInicioSesionComponent],
  templateUrl: './login-profesor.component.html',
  styleUrl: './login-profesor.component.scss'
})
export class LoginProfesorComponent {

}
