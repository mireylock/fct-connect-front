import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../headers/header-landing/header-landing.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.scss'
})
export class PoliticaPrivacidadComponent {

}
