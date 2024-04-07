import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-login-empresa',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent],
  templateUrl: './login-empresa.component.html',
  styleUrl: './login-empresa.component.scss'
})
export class LoginEmpresaComponent {

}
