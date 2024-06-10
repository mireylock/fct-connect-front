import { Component } from '@angular/core';
import { TutoriaService } from '../../../service/tutoria.service';
import { Alumno } from '../../../interfaces/alumno';
import { AlumnosPaginacion } from '../../../interfaces/alumnos-paginacion';
import { Idioma } from '../../../interfaces/idioma';
import { AuthService } from '../../../service/auth.service';
import { IdiomaService } from '../../../service/idioma.service';
import { UtilsService } from '../../../service/utils.service';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-total-alumnos-tutoria',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    NgFor,
    FormsModule,
    HeaderProfesorComponent,
    FooterComponent,
  ],  templateUrl: './list-total-alumnos-tutoria.component.html',
  styleUrl: './list-total-alumnos-tutoria.component.scss'
})
export class ListTotalAlumnosTutoriaComponent {
  rol: string | undefined;
  idProfesor:any;

  pagina: number = 0;
  tamanio: number = 6;
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  alumnosPaginacion: AlumnosPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  hablaIngles: boolean = false;
  idiomas: Idioma[] | undefined;
  alumnos: Alumno[] = [];

  nombre: string = '';
  idioma: string = '';
  vehiculoPropio: string = '';

  constructor(
    private tutoriaService: TutoriaService,
    public authService: AuthService,
    private utilsService: UtilsService, 
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.idProfesor = this.authService.getUser().id;
    this.getBusquedaAlumnosTutoria(this.idProfesor, '', 0, this.tamanio);
  }

  buscar() {
    this.getBusquedaAlumnosTutoria(
      this.idProfesor,
      this.nombre,
      this.pagina,
      this.tamanio
    );
  }


  getBusquedaAlumnosTutoria(
    idProfesor:number,
    nombre: string,
    pagina: number,
    tamanio: number
  ) {
    this.tutoriaService.getBusquedaAlumnosTutoriaProfesor(idProfesor, nombre, pagina, tamanio)
      .subscribe({
        next: (data) => {
          this.alumnosPaginacion = data as AlumnosPaginacion;
          this.alumnos = this.alumnosPaginacion.alumnos;
          this.totalItems = this.alumnosPaginacion.totalItems;
          this.totalPages = this.alumnosPaginacion.totalPages;
          this.currentPage = this.alumnosPaginacion.currentPage;
          this.repeticionesArray = Array(this.totalPages)
            .fill(0)
            .map((x, i) => i);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }



  avanzarPagina() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getBusquedaAlumnosTutoria(
        this.idProfesor,
        this.nombre,
        this.currentPage,
        this.tamanio
      );
    }
  }

  retrocederPagina() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.getBusquedaAlumnosTutoria(
        this.idProfesor,
        this.nombre,
        this.currentPage,
        this.tamanio
      );
    }
  }

  irAPagina(numeroPagina: number) {
    this.getBusquedaAlumnosTutoria(
      this.idProfesor,
      this.nombre,
      numeroPagina,
      this.tamanio
    );
  }

  returnNivelIdiomaFirstLetterUpper(nivelIdioma: string) {
    return this.utilsService.returnFirstLetterUpper(nivelIdioma);
  }

}
