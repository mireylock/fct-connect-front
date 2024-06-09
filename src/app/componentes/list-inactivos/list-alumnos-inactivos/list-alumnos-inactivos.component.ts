import { NgClass, NgIf, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Alumno } from '../../../interfaces/alumno';
import { AlumnosPaginacion } from '../../../interfaces/alumnos-paginacion';
import { Idioma } from '../../../interfaces/idioma';
import { AuthService } from '../../../service/auth.service';
import { IdiomaService } from '../../../service/idioma.service';
import { UtilsService } from '../../../service/utils.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { ListParcialAlumnosComponent } from '../../listas-parciales/list-parcial-alumnos/list-parcial-alumnos.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-alumnos-inactivos',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf, NgFor, FormsModule, HeaderAdministradorComponent, HeaderEmpresaComponent, HeaderProfesorComponent, FooterComponent, ListParcialAlumnosComponent],
  templateUrl: './list-alumnos-inactivos.component.html',
  styleUrl: './list-alumnos-inactivos.component.scss'
})
export class ListAlumnosInactivosComponent {
  pagina:number=0;
  tamanio:number=6;
  totalItems:number=0;
  totalPages:number=0;
  currentPage:number=0;
  alumnosPaginacion:AlumnosPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  hablaIngles:boolean = false;
  idiomas:Idioma[] | undefined;
  alumnos:Alumno[]=[];

  nombre: string = '';
  idioma: string = '';
  vehiculoPropio: string = '';
  
  constructor(private userService:UserService, private idiomaService:IdiomaService, private utilsService:UtilsService){}

  ngOnInit(): void {
    this.getIdiomas();
    this.getBusquedaAlumnosInactivos('', '', '', 0, this.tamanio);
  }

  buscar() {  
    this.getBusquedaAlumnosInactivos(this.nombre, this.idioma, this.vehiculoPropio, this.pagina, this.tamanio);
  }

  getIdiomas() {
    this.idiomaService.getAllIdiomas().subscribe({
      next: (data) => {
        this.idiomas = data as Idioma[];
      }, 
      error: (err) => {
        console.log(err+'BÚSQUEDA ALUMNOS');
      }
    })
  }

  getBusquedaAlumnosInactivos(nombre:string, idioma:string, vehiculoPropio:string, pagina:number, tamanio:number) {
    this.userService.getBusquedaAlumnosInactivos(nombre, idioma, vehiculoPropio, pagina, tamanio).subscribe({
      next: (data) => {
        this.alumnosPaginacion = data as AlumnosPaginacion;
        this.alumnos = this.alumnosPaginacion.alumnos;
        this.totalItems = this.alumnosPaginacion.totalItems;
        this.totalPages = this.alumnosPaginacion.totalPages;
        this.currentPage = this.alumnosPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages).fill(0).map((x, i) => i);
      }, 
      error: (err) => {
        console.log(err+'BÚSQUEDA ALUMNOS');
      }
    })
  }

  avanzarPagina() {
    if(this.currentPage < this.totalPages -1) {
      this.currentPage++;
      this.getBusquedaAlumnosInactivos(this.nombre, this.idioma, this.vehiculoPropio, this.currentPage, this.tamanio);
    }
  }

  retrocederPagina() {
    if(this.currentPage > 0) {
      this.currentPage=this.currentPage-1;
      this.getBusquedaAlumnosInactivos(this.nombre, this.idioma, this.vehiculoPropio, this.currentPage, this.tamanio);
    }
  }

  irAPagina(numeroPagina:number) {
    this.getBusquedaAlumnosInactivos(this.nombre, this.idioma, this.vehiculoPropio, numeroPagina, this.tamanio);
  }

  returnNivelIdiomaFirstLetterUpper(nivelIdioma:string) {
    return this.utilsService.returnFirstLetterUpper(nivelIdioma);
  }

}
