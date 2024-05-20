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

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [HeaderAlumnoComponent, HeaderEmpresaComponent, HeaderProfesorComponent, HeaderAdministradorComponent, IndexAlumnoComponent, IndexEmpresaComponent, IndexProfesorComponent, IndexAdminComponent, FooterComponent, NgIf],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent implements OnInit{

  constructor(private storageService:StorageService, private userService:UserService ){}

  isLoggedIn:boolean=true;
  idUser:number = 0;
  rolUser:string = '';
  alumno:Alumno | undefined;
  empresa:Empresa | undefined;
  profesor:Profesor | undefined;
  administrador:Administrador | undefined;

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.idUser = this.storageService.getUser().id;
      this.rolUser = this.storageService.getUser().rol;

      switch (this.rolUser) {
        case "alumno":
          this.userService.getAlumno(this.idUser).subscribe({
            next: (data) => {
              this.alumno = data as Alumno;
              console.log(this.alumno);
            }, 
            error: (err) => {
              console.log(err);
            }
          })

        break;

        case "empresa":
          this.userService.getEmpresa(this.idUser).subscribe({
            next: (data) => {
              this.empresa = data as Empresa;
              console.log(this.empresa);
            }, 
            error: (err) => {
              console.log(err);
            }
          });
          break;

        case "profesor":
          this.userService.getProfesor(this.idUser).subscribe({
            next: (data) => {
              this.profesor = data as Profesor;
            }, 
            error: (err) => {
              console.log(err);
            }
          });        
        break;

        case "administrador":
          this.userService.getAdministrador(this.idUser).subscribe({
            next: (data) => {
              this.administrador = data as Administrador;
            }, 
            error: (err) => {
              console.log(err);
            }
          });
        break;
      }

    }
  }  

}
