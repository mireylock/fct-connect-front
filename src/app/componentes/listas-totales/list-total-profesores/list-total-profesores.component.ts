import { Component, OnInit } from '@angular/core';
import { Profesor } from '../../../interfaces/profesor';
import { ProfesoresPaginacion } from '../../../interfaces/profesores-paginacion';
import { UserService } from '../../../service/user.service';
import { UtilsService } from '../../../service/utils.service';
import { NgClass, NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-list-total-profesores',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    NgFor,
    FormsModule,
    HeaderAdministradorComponent,
    FooterComponent,
  ],
  templateUrl: './list-total-profesores.component.html',
  styleUrl: './list-total-profesores.component.scss',
})
export class ListTotalProfesoresComponent implements OnInit {
  rol: string | undefined;

  pagina: number = 0;
  tamanio: number = 6;
  totalItems: number = 0;
  totalPages: number = 0;
  currentPage: number = 0;
  profesoresPaginacion: ProfesoresPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  profesores: Profesor[] = [];

  nombre: string = '';


  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getBusquedaProfesores('', 0, this.tamanio);
  }

  buscar() {
    this.getBusquedaProfesores(this.nombre, this.pagina, this.tamanio);
  }

  getBusquedaProfesores(nombre: string, pagina: number, tamanio: number) {
    this.userService.getBusquedaProfesores(nombre, pagina, tamanio).subscribe({
      next: (data) => {
        this.profesoresPaginacion = data as ProfesoresPaginacion;
        this.profesores = this.profesoresPaginacion.profesores;
        this.totalItems = this.profesoresPaginacion.totalItems;
        this.totalPages = this.profesoresPaginacion.totalPages;
        this.currentPage = this.profesoresPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages)
          .fill(0)
          .map((x, i) => i);
      },
      error: (err) => {
        console.log(err + 'BÚSQUEDA PROFESORES');
      },
    });
  }

  avanzarPagina() {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.getBusquedaProfesores(this.nombre, this.currentPage, this.tamanio);
    }
  }

  retrocederPagina() {
    if (this.currentPage > 0) {
      this.currentPage = this.currentPage - 1;
      this.getBusquedaProfesores(this.nombre, this.currentPage, this.tamanio);
    }
  }

  irAPagina(numeroPagina: number) {
    this.getBusquedaProfesores(this.nombre, numeroPagina, this.tamanio);
  }
}
