import { Component, OnInit } from '@angular/core';
import { HeaderLandingComponent } from '../headers/header-landing/header-landing.component';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../service/auth.service';
import { HeaderAdministradorComponent } from '../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../headers/header-alumno/header-alumno.component';
import { HeaderEmpresaComponent } from '../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../headers/header-profesor/header-profesor.component';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-politica-privacidad',
  standalone: true,
  imports: [HeaderLandingComponent, HeaderAdministradorComponent, HeaderAlumnoComponent, HeaderEmpresaComponent, HeaderProfesorComponent, NgIf, FooterComponent],
  templateUrl: './politica-privacidad.component.html',
  styleUrl: './politica-privacidad.component.scss',
})
export class PoliticaPrivacidadComponent implements OnInit {

  rol:string | undefined;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
  }
}
