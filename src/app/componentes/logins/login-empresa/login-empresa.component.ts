import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { RouterLink } from '@angular/router';
import { FormularioInicioSesionComponent } from '../formulario-inicio-sesion/formulario-inicio-sesion.component';

@Component({
  selector: 'app-login-empresa',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, RouterLink, FormularioInicioSesionComponent],
  templateUrl: './login-empresa.component.html',
  styleUrl: './login-empresa.component.scss'
})
export class LoginEmpresaComponent {

}
