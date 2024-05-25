import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { UserService } from '../../service/user.service';
import { Alumno } from '../../interfaces/alumno';
import { Administrador } from '../../interfaces/administrador';
import { Empresa } from '../../interfaces/empresa';
import { Profesor } from '../../interfaces/profesor';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-bienvenida',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './bienvenida.component.html',
  styleUrl: './bienvenida.component.scss'
})
export class BienvenidaComponent implements OnInit{

  rol:string | undefined;  
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  idUser:number = 0;
  rolUser:string = '';
  alumno:Alumno | undefined;
  empresa:Empresa | undefined;
  profesor:Profesor | undefined;
  administrador:Administrador | undefined;
  
  constructor(private storageService:StorageService, private userService:UserService, private authService:AuthService) { }

  ngOnInit(): void {
    this.rol = this.authService.getRol();

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
