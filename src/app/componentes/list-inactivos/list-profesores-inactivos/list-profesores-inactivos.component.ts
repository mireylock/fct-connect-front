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

@Component({
  selector: 'app-list-profesores-inactivos',
  standalone: true,
  imports: [
    RouterLink,
    NgClass,
    NgIf,
    NgFor,
    FormsModule,
    HeaderAdministradorComponent,
    FooterComponent,
  ],  templateUrl: './list-profesores-inactivos.component.html',
  styleUrl: './list-profesores-inactivos.component.scss'
})
export class ListProfesoresInactivosComponent implements OnInit {

  pagina:number=0;
  tamanio:number=6;
  totalItems:number=0;
  totalPages:number=0;
  currentPage:number=0;
  profesoresPaginacion:ProfesoresPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  profesores:Profesor[]=[];

  nombre: string = '';
  
  constructor(private userService:UserService, private utilsService:UtilsService){}

  ngOnInit(): void {
    this.getBusquedaProfesoresInactivos('', 0, this.tamanio);
  }

  buscar() {  
    this.getBusquedaProfesoresInactivos(this.nombre, this.pagina, this.tamanio);
  }

  getBusquedaProfesoresInactivos(nombre:string, pagina:number, tamanio:number) {
    this.userService.getBusquedaProfesoresInactivos(nombre, pagina, tamanio).subscribe({
      next: (data) => {
        this.profesoresPaginacion = data as ProfesoresPaginacion;
        this.profesores = this.profesoresPaginacion.profesores;
        this.totalItems = this.profesoresPaginacion.totalItems;
        this.totalPages = this.profesoresPaginacion.totalPages;
        this.currentPage = this.profesoresPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages).fill(0).map((x, i) => i);
      }, 
      error: (err) => {
        console.log(err+'BÚSQUEDA PROFESORES');
      }
    })
  }

  avanzarPagina() {
    if(this.currentPage < this.totalPages -1) {
      this.currentPage++;
      this.getBusquedaProfesoresInactivos(this.nombre, this.currentPage, this.tamanio);
    }
  }

  retrocederPagina() {
    if(this.currentPage > 0) {
      this.currentPage=this.currentPage-1;
      this.getBusquedaProfesoresInactivos(this.nombre, this.currentPage, this.tamanio);
    }
  }

  irAPagina(numeroPagina:number) {
    this.getBusquedaProfesoresInactivos(this.nombre, numeroPagina, this.tamanio);
  }

}
