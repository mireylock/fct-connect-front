import { Component, OnInit } from '@angular/core';
import { BienvenidaComponent } from '../../bienvenida/bienvenida.component';
import { StorageService } from '../../../service/storage.service';
import { Router } from '@angular/router';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgIf } from '@angular/common';
import { Alumno } from '../../../interfaces/alumno';
import { Empresa } from '../../../interfaces/empresa';
import { Profesor } from '../../../interfaces/profesor';
import { Administrador } from '../../../interfaces/administrador';
import { UserService } from '../../../service/user.service';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { IndexAlumnoComponent } from '../index-alumno/index-alumno.component';
import { IndexEmpresaComponent } from '../index-empresa/index-empresa.component';
import { IndexProfesorComponent } from '../index-profesor/index-profesor.component';
import { IndexAdminComponent } from '../index-admin/index-admin.component';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderAlumnoComponent, HeaderEmpresaComponent, HeaderProfesorComponent, HeaderAdministradorComponent, IndexAlumnoComponent, IndexEmpresaComponent, IndexProfesorComponent, IndexAdminComponent, FooterComponent, NgIf],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  rol:string | undefined;

  constructor(private storageService:StorageService, private userService:UserService, private authService:AuthService ){}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
  }

}
