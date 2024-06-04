import { Component, OnInit } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { Alumno } from '../../../interfaces/alumno';
import { Empresa } from '../../../interfaces/empresa';
import { Profesor } from '../../../interfaces/profesor';
import { Administrador } from '../../../interfaces/administrador';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';
import { FooterComponent } from '../../footer/footer.component';
import { ListParcialAlumnosComponent } from '../../listas-parciales/list-parcial-alumnos/list-parcial-alumnos.component';
import { AlumnosPaginacion } from '../../../interfaces/alumnos-paginacion';
import { Idioma } from '../../../interfaces/idioma';
import { IdiomaService } from '../../../service/idioma.service';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';

@Component({
  selector: 'app-list-total-alumnos',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf, NgFor, FormsModule, HeaderAdministradorComponent, HeaderEmpresaComponent, HeaderProfesorComponent, FooterComponent, ListParcialAlumnosComponent],
  templateUrl: './list-total-alumnos.component.html',
  styleUrl: './list-total-alumnos.component.scss'
})
export class ListTotalAlumnosComponent implements OnInit {

  rol: string | undefined;

  pagina:number=0;
  tamanio:number=5;
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
  
  constructor(private userService:UserService, private idiomaService:IdiomaService, public authService:AuthService){}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getIdiomas();
    this.getAlumnosPaginacion(0, this.tamanio);
  }

  buscar() {  
    this.getBusquedaAlumnos(this.nombre, this.idioma, this.vehiculoPropio, this.pagina, this.tamanio);
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

  getBusquedaAlumnos(nombre:string, idioma:string, vehiculoPropio:string, pagina:number, tamanio:number) {
    this.userService.getBusquedaAlumnos(nombre, idioma, vehiculoPropio, pagina, tamanio).subscribe({
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



  getAlumnosPaginacion(pagina:number, tamanio:number) {
    this.userService.getAlumnosPaginacion(pagina, tamanio).subscribe({
      next: (data) => {
        this.alumnosPaginacion = data as AlumnosPaginacion;
        this.alumnos = this.alumnosPaginacion.alumnos;
        this.totalItems = this.alumnosPaginacion.totalItems;
        this.totalPages = this.alumnosPaginacion.totalPages;
        this.currentPage = this.alumnosPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages).fill(0).map((x, i) => i);
      }, 
      error: (err) => {
        console.log(err+'ALUMNOS');
      }
    })
  }

  avanzarPagina() {
    if(this.currentPage < this.totalPages -1) {
      this.currentPage++;
      this.getAlumnosPaginacion(this.currentPage, this.tamanio);
    }
  }

  retrocederPagina() {
    if(this.currentPage > 0) {
      this.currentPage=this.currentPage-1;
      this.getAlumnosPaginacion(this.currentPage, this.tamanio);
    }
  }

  irAPagina(numeroPagina:number) {
    this.getAlumnosPaginacion(numeroPagina, this.tamanio);
  }

  returnNivelIdiomaFirstLetterUpper(nivelIdioma:string) {
    if (!nivelIdioma) return "";
    return nivelIdioma[0].toUpperCase() + nivelIdioma.slice(1).toLowerCase();
  }

}
