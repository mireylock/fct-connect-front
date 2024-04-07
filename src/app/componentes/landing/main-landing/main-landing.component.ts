import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LandingModule } from '../landing.module';
import { FooterComponent } from '../../footer/footer.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, LandingModule, FooterComponent],
  templateUrl: './main-landing.component.html',
  styleUrl: './main-landing.component.scss'
})
export class MainLandingComponent {

}
