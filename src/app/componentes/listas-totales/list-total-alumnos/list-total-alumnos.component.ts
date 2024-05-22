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

@Component({
  selector: 'app-list-total-alumnos',
  standalone: true,
  imports: [NgClass, NgIf, NgFor, FormsModule, HeaderAdministradorComponent, HeaderAlumnoComponent, HeaderProfesorComponent, FooterComponent, ListParcialAlumnosComponent],
  templateUrl: './list-total-alumnos.component.html',
  styleUrl: './list-total-alumnos.component.scss'
})
export class ListTotalAlumnosComponent implements OnInit {

  filtrarAlumnos() {
throw new Error('Method not implemented.');
}

  pagina:number=0;
  tamanio:number=5;
  totalItems:number=0;
  totalPages:number=0;
  currentPage:number=0;
  alumnosPaginacion:AlumnosPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  hablaIngles:boolean = false;
  idiomas:Idioma[] | undefined;

  nombre: string = '';
  idioma: string = '';
  vehiculoPropio: string = '';
  
  constructor(private storageService:StorageService, private userService:UserService, private idiomaService:IdiomaService){

  }

  getAllIdiomas() {
    this.idiomaService.getAllIdiomas().subscribe({
      next: (data) => {
        this.idiomas = data as Idioma[];  
      }, 
      error: (err) => {
        console.log(err+'ALUMNOS');
      }
    })
  }

  buscar() {
    console.log('Nombre:', this.nombre);
    console.log('Idioma:', this.idioma);
    console.log('Vehículo propio:', this.vehiculoPropio);    
    this.getBusquedaAlumnos(this.nombre, this.idioma, this.vehiculoPropio, this.pagina, this.tamanio);
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

  isLoggedIn:boolean=true;
  idUser:number = 0;
  rolUser:string = '';
  alumno:Alumno | undefined;
  empresa:Empresa | undefined;
  profesor:Profesor | undefined;
  administrador:Administrador | undefined;

  alumnos:Alumno[]=[];

  dbError:boolean=false;

  ngOnInit(): void {
    this.getAlumnosPaginacion(0, this.tamanio);
    this.getAllIdiomas();

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
