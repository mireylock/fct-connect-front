import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LandingModule } from '../landing.module';
import { FooterComponent } from '../../footer/footer.component';
import { NgIf } from '@angular/common';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterLinkActive, RouterLink, LandingModule, FooterComponent, NgIf, HeaderAdministradorComponent, HeaderAlumnoComponent, HeaderEmpresaComponent, HeaderProfesorComponent],
  templateUrl: './main-landing.component.html',
  styleUrl: './main-landing.component.scss'
})
export class MainLandingComponent implements OnInit {

  rol:string | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
  }

}
