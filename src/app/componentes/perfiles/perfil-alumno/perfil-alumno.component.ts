import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgIf, NgClass, NgFor, Location } from '@angular/common';
import { Alumno } from '../../../interfaces/alumno';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlumnoDTO } from '../../../interfaces/alumno-dto';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { Profesor } from '../../../interfaces/profesor';
import { UtilsService } from '../../../service/utils.service';
import { IdiomaComponent } from './idioma/idioma.component';
import { ActivarODesactivarComponent } from '../../activar-o-desactivar/activar-o-desactivar.component';
import { MediaService } from '../../../service/media.service';
import { Formacion } from '../../../interfaces/formacion';
import { FormacionService } from '../../../service/formacion.service';

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
    IdiomaComponent,
    ActivarODesactivarComponent,
  ],
})
export class PerfilAlumnoComponent implements OnInit {
  rol: string | undefined;
  id: any;
  alumno: Alumno | undefined;
  alumnoDTO: AlumnoDTO | undefined;
  tutorPracticas: Profesor | undefined;
  pathCv: string | undefined;
  pathExpediente: string | undefined;
  formaciones: Formacion[] | undefined;
  formacion: any = '';
  pathFoto: any = '';

  modalCambiosRealizados = 'modalCambiosRealizados';

  formPersonalData: any = {
    id: this.getId(),
    telefono: null,
    direccion: null,
    carnetConducir: null,
    vehiculoPropio: null,
  };

  constructor(
    private location: Location,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private mediaService: MediaService,
    private formacionService: FormacionService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getAlumno(this.id);
    this.formacionService.getFormaciones().subscribe({
      next: (data) => {
        this.formaciones = data as Formacion[];
        console.log(this.formaciones);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onSubmit() {
    const { id, telefono, direccion, carnetConducir, vehiculoPropio } =
      this.formPersonalData;

    const pathCV = this.pathCv;
    const pathExpediente = this.pathExpediente;
    const formacion = this.formacion;
    const pathFoto = this.pathFoto;

    console.log(this.formPersonalData);

    const alumnoDTO: AlumnoDTO = {
      id,
      telefono,
      direccion,
      carnetConducir,
      vehiculoPropio,
      pathCV,
      pathExpediente,
      formacion,
      pathFoto,
    };

    this.userService.updateAlumno(alumnoDTO).subscribe({
      next: () => {
        this.utilsService.abrirModal(this.modalCambiosRealizados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  goBack(): void {
    this.location.back();
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

        this.pathCv = this.alumno?.pathCV;
        this.pathExpediente = this.alumno.pathExpediente;
        this.formacion = this.alumno.formacion;
        this.pathFoto = this.alumno.pathFoto;
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

  uploadCV(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (data) => {
          this.pathCv = data.url;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  uploadExpediente(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (data) => {
          this.pathExpediente = data.url;
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  eliminarCv() {
    const { id, telefono, direccion, carnetConducir, vehiculoPropio } =
      this.formPersonalData;

    const pathCV = undefined;
    const pathExpediente = this.pathExpediente;
    const formacion = this.formacion;
    const pathFoto = this.pathFoto;

    console.log(this.formPersonalData);

    const alumnoDTO: AlumnoDTO = {
      id,
      telefono,
      direccion,
      carnetConducir,
      vehiculoPropio,
      pathCV,
      pathExpediente,
      formacion,
      pathFoto,
    };

    this.userService.updateAlumno(alumnoDTO).subscribe({
      next: () => {
        this.utilsService.abrirModal(this.modalCambiosRealizados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  eliminarExpediente() {
    const { id, telefono, direccion, carnetConducir, vehiculoPropio } =
      this.formPersonalData;

    const pathCV = this.pathCv;
    const pathExpediente = undefined;
    const formacion = this.formacion;
    const pathFoto = this.pathFoto;

    console.log(this.formPersonalData);

    const alumnoDTO: AlumnoDTO = {
      id,
      telefono,
      direccion,
      carnetConducir,
      vehiculoPropio,
      pathCV,
      pathExpediente,
      formacion,
      pathFoto,
    };

    this.userService.updateAlumno(alumnoDTO).subscribe({
      next: () => {
        this.utilsService.abrirModal(this.modalCambiosRealizados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onEditIconClick(): void {
    const fileInput = document.getElementById('fileInputFoto') as HTMLInputElement;
    console.log(fileInput);
    fileInput.click();
  }

  uploadFoto(event: any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (data) => {
          const pathFoto = data.url;
          const { id, telefono, direccion, carnetConducir, vehiculoPropio } =
            this.formPersonalData;
          const pathCV = this.pathCv;
          const pathExpediente = this.pathExpediente;
          const formacion = this.formacion;

          const alumnoDTO: AlumnoDTO = {
            id,
            telefono,
            direccion,
            carnetConducir,
            vehiculoPropio,
            pathCV,
            pathExpediente,
            formacion,
            pathFoto,
          };

          this.userService.updateAlumno(alumnoDTO).subscribe({
            next: () => {
              window.location.reload();
            },
            error: (error) => {
              console.log(error);
            },
          });
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  reload() {
    window.location.reload();
  }
}
