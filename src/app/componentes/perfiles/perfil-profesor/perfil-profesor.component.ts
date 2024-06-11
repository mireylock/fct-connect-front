import { NgFor, NgIf, NgClass, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActivarODesactivarComponent } from '../../activar-o-desactivar/activar-o-desactivar.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { Profesor } from '../../../interfaces/profesor';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { UtilsService } from '../../../service/utils.service';
import { ProfesorDto } from '../../../interfaces/profesor-dto';
import { MediaService } from '../../../service/media.service';

@Component({
  selector: 'app-perfil-profesor',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    HeaderProfesorComponent,
    HeaderEmpresaComponent,
    HeaderAlumnoComponent,
    HeaderAdministradorComponent,
    FooterComponent,
    ActivarODesactivarComponent,
  ],
  templateUrl: './perfil-profesor.component.html',
  styleUrl: './perfil-profesor.component.scss',
})
export class PerfilProfesorComponent {
  rol: string | undefined;
  id: any;
  profesor: Profesor | undefined;
  profesorDTO: ProfesorDto | undefined;
  tutorPracticas: Profesor | undefined;
  pathFoto: any;
  modalCambiosRealizados = 'modalCambiosRealizados';

  formPersonalData: any = {
    id: this.getId(),
    telefono: null,
    direccion: null,
  };

  formJobData: any = {
    id: this.getId(),
    departamento: null,
    asignaturas: null,
  };

  constructor(
    private location: Location,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilsService: UtilsService,
    private mediaService: MediaService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getProfesor(this.id);
    console.log(this.formPersonalData);
  }

  onSubmit() {
    const { id, telefono, direccion } = this.formPersonalData;
    const pathFoto = this.pathFoto;

    const profesorDTO: ProfesorDto = {
      id,
      telefono,
      direccion,
      pathFoto,
    };

    this.userService.updateProfesor(profesorDTO).subscribe({
      next: () => {
        this.utilsService.abrirModal(this.modalCambiosRealizados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  onSubmitJob() {}

  goBack(): void {
    this.location.back();
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  getProfesor(id: number) {
    this.userService.getProfesor(id).subscribe({
      next: (data) => {
        this.profesor = data as Profesor;
        this.pathFoto = this.profesor.pathFoto;
        this.initializeFormPersonalData();
        console.log(this.profesor.asignaturas);
      },
      error: (err) => {
        console.log(err + 'PROFESOR');
      },
    });
  }

  initializeFormPersonalData() {
    this.formPersonalData = {
      id: this.profesor?.id,
      telefono: this.profesor?.telefono,
      direccion: this.profesor?.direccion,
    };
  }

  onEditIconClick(): void {
    const fileInput = document.getElementById(
      'fileInputFoto'
    ) as HTMLInputElement;
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

          const { id, telefono, direccion } = this.formPersonalData;

          const profesorDto: ProfesorDto = {
            id,
            telefono,
            direccion,
            pathFoto,
          };

          console.log(JSON.stringify(profesorDto));

          this.userService.updateProfesor(profesorDto).subscribe({
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
