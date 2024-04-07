import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-login-profesor',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent],
  templateUrl: './login-profesor.component.html',
  styleUrl: './login-profesor.component.scss'
})
export class LoginProfesorComponent {

}
