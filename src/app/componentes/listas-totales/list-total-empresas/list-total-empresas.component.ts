import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasPaginacion } from '../../../interfaces/empresas-paginacion';
import { NgClass, NgFor, NgIf } from '@angular/common';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-total-empresas',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, HeaderAdministradorComponent, RouterLink, HeaderAlumnoComponent, HeaderProfesorComponent, FooterComponent, FormsModule],
  templateUrl: './list-total-empresas.component.html',
  styleUrl: './list-total-empresas.component.scss'
})
export class ListTotalEmpresasComponent {
  rol: string | undefined;

  pagina:number=0;
  tamanio:number=6;
  totalItems:number=0;
  totalPages:number=0;
  currentPage:number=0;
  empresasPaginacion:EmpresasPaginacion | undefined;
  repeticionesArray: number[] | undefined;
  empresas:Empresa[]=[];

  nombre: string = '';
  ingles: string = '';  
  modalidadTrabajo:string = '';
  tecnologia:string = '';

  modalidadesTrabajo = ['Presencial', 'Online', 'Híbrido'];
  modalidadesTrabajoValue = ['PRESENCIAL', 'ONLINE', 'HIBRIDO'];

  inglesSolicitado = ['Imprescindible', 'Importante', 'No necesario'];
  inglesSolicitadoValue = ['IMPRESCINDIBLE', 'IMPORTANTE', 'NO_NECESARIO'];


  constructor(private userService:UserService, public authService:AuthService){}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getEmpresasPaginacion(0, this.tamanio);     
  }

  isModalidadPresente(modalidadesTrabajo:string[], modalidad: string): boolean {
    let modalidadUpperSinTildes = modalidad.normalize('NFD').replace(/[\u0300-\u036f]/g, "").toUpperCase();
    return modalidadesTrabajo.includes(modalidadUpperSinTildes);
  }


  buscar() {   
    this.getBusquedaEmpresas(this.nombre, this.modalidadTrabajo, this.ingles, this.tecnologia, this.pagina, this.tamanio);
  }

  getBusquedaEmpresas(nombre:string, modadliadTrabajo:string, inglesSolicitado:string, tecnologia:string, pagina:number, tamanio:number ) {

    this.userService.getBusquedaEmpresas(nombre, modadliadTrabajo, inglesSolicitado, tecnologia, pagina, tamanio).subscribe({
      next: (data) => {
        this.empresasPaginacion = data as EmpresasPaginacion;
        this.empresas = this.empresasPaginacion.empresas;
        this.totalItems = this.empresasPaginacion.totalItems;
        this.totalPages = this.empresasPaginacion.totalPages;
        this.currentPage = this.empresasPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages).fill(0).map((x, i) => i);
      }, 
      error: (err) => {
        console.log(err+'BÚSQUEDA EMPRESAS');
      }
    })
  }



  getEmpresasPaginacion(pagina:number, tamanio:number) {
    this.userService.getEmpresasPaginacion(pagina, tamanio).subscribe({
      next: (data) => {
        this.empresasPaginacion = data as EmpresasPaginacion;
        this.empresas = this.empresasPaginacion.empresas;
        this.totalItems = this.empresasPaginacion.totalItems;
        this.totalPages = this.empresasPaginacion.totalPages;
        this.currentPage = this.empresasPaginacion.currentPage;
        this.repeticionesArray = Array(this.totalPages).fill(0).map((x, i) => i);
        console.log(this.empresasPaginacion);

      }, 
      error: (err) => {
        console.log(err+'EMPRESAS');
      }
    })
  }

  avanzarPagina() {
    if(this.currentPage < this.totalPages -1) {
      this.currentPage++;
      this.getEmpresasPaginacion(this.currentPage, this.tamanio);
    }
  }

  retrocederPagina() {
    if(this.currentPage > 0) {
      this.currentPage=this.currentPage-1;
      this.getEmpresasPaginacion(this.currentPage, this.tamanio);
    }
  }

  irAPagina(numeroPagina:number) {
    this.getEmpresasPaginacion(numeroPagina, this.tamanio);
  }

}
