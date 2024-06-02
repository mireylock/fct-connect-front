import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgIf, NgClass, NgFor } from '@angular/common';
import { Alumno } from '../../../interfaces/alumno';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlumnoDTO } from '../../../interfaces/alumno-dto';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { Profesor } from '../../../interfaces/profesor';
import { ListTotalAlumnosComponent } from '../../listas-totales/list-total-alumnos/list-total-alumnos.component';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.scss',
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    HeaderAlumnoComponent,
    HeaderEmpresaComponent,
    HeaderProfesorComponent,
    HeaderAdministradorComponent,
    FooterComponent,
  ],
})
export class PerfilAlumnoComponent implements OnInit {
  rol: string | undefined;
  id: any;
  alumno: Alumno | undefined;
  alumnoDTO: AlumnoDTO | undefined;
  tutorPracticas: Profesor | undefined;

  formPersonalData: any = {
    id: this.getId(),
    telefono: null,
    direccion: null,
    carnetConducir: null,
    vehiculoPropio: null,
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  onSubmit() {
    const { id, telefono, direccion, carnetConducir, vehiculoPropio } =
      this.formPersonalData;

    const alumnoDTO: AlumnoDTO = {
      id,
      telefono,
      direccion,
      carnetConducir,
      vehiculoPropio,
    };

    this.userService.updateAlumno(alumnoDTO).subscribe({
      next: () => {
        window.location.reload;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getAlumno(this.id);
    console.log(this.formPersonalData);
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  getAlumno(id: number) {
    this.userService.getAlumno(id).subscribe({
      next: (data) => {
        this.alumno = data as Alumno;

        const profesorPracticas = this.alumno?.profesorTutorizaAlumnos.find(
          (tutoria) => tutoria.tipoTutoria === 'Practicas'
        );
        if (profesorPracticas != undefined) {
          this.tutorPracticas = profesorPracticas.profesor;
        }
        this.initializeFormPersonalData();
      },
      error: (err) => {
        console.log(err + 'ALUMNO');
      },
    });
  }

  initializeFormPersonalData() {
    this.formPersonalData = {
      id: this.alumno?.id,
      telefono: this.alumno?.telefono,
      direccion: this.alumno?.direccion,
      carnetConducir: this.alumno?.carnetConducir,
      vehiculoPropio: this.alumno?.vehiculoPropio,
    };
  }

  returnNivelIdiomaLowerCase(nivelIdioma:string) {
    if (!nivelIdioma) return "";
    return nivelIdioma[0].toUpperCase() + nivelIdioma.slice(1).toLowerCase();
  }
}
