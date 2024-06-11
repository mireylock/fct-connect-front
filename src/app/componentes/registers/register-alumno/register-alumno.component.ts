import { Component, OnInit } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { UtilsService } from '../../../service/utils.service';
import { Formacion } from '../../../interfaces/formacion';
import { FormacionService } from '../../../service/formacion.service';

@Component({
  selector: 'app-register-alumno',
  standalone: true,
  imports: [
    HeaderAdministradorComponent,
    FooterComponent,
    NgClass,
    NgIf,
    FormsModule,
    NgFor
  ],
  templateUrl: './register-alumno.component.html',
  styleUrl: './register-alumno.component.scss',
})
export class RegisterAlumnoComponent implements OnInit {
  formaciones: Formacion[] | undefined;
  formacion:any='';

  form: any = {
    nombre: null,
    apellido1: null,
    apellido2: null,
    email: null,
    password: null,
    rol: 'alumno',
    pathFoto: 'http://localhost:8080/v1/api/media/profile.png',
    carnetConducir: 0,
    vehiculoPropio: 0,
    formacion: null,
  };
  errorMessage: any;

  constructor(
    private authService: AuthService,
    private location: Location,
    private utilsService: UtilsService, 
    private formacionService: FormacionService
  ) {}

  ngOnInit(): void {
    this.formacionService.getFormaciones().subscribe({
      next: (data) => {
        this.formaciones = data as Formacion[];
        console.log(this.formaciones)
      }, 
      error: (err) => {
        console.log(err);
      }
    })  
  }

  onSubmit(): void {
    const {
      email,
      password,
      rol,
      nombre,
      apellido1,
      apellido2,
      dni,
      pathFoto,
      carnetConducir,
      vehiculoPropio,
    } = this.form;

    this.authService
      .registerAlumno(
        email,
        password,
        rol,
        nombre,
        apellido1,
        apellido2,
        dni,
        pathFoto,
        carnetConducir,
        vehiculoPropio,
        this.formacion
      )
      .subscribe({
        next: () => {
          this.utilsService.abrirModal('modalRegistrado');
        },
        error: (err) => {
          this.errorMessage = err.error.message;
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  reload() {
    window.location.reload();
  }
}
