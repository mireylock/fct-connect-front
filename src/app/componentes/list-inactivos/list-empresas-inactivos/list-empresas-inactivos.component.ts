import { NgIf, NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { EmpresasPaginacion } from '../../../interfaces/empresas-paginacion';
import { UserService } from '../../../service/user.service';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';

@Component({
  selector: 'app-list-empresas-inactivos',
  standalone: true,
  imports: [NgIf, NgFor, NgClass, HeaderAdministradorComponent, RouterLink, HeaderAlumnoComponent, HeaderProfesorComponent, FooterComponent, FormsModule],
  templateUrl: './list-empresas-inactivos.component.html',
  styleUrl: './list-empresas-inactivos.component.scss'
})
export class ListEmpresasInactivosComponent {
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


  constructor(private userService:UserService){}

  ngOnInit(): void {
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

    this.userService.getBusquedaEmpresasInactivas(nombre, modadliadTrabajo, inglesSolicitado, tecnologia, pagina, tamanio).subscribe({
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
    this.userService.getEmpresasInactivasPaginacion(pagina, tamanio).subscribe({
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
