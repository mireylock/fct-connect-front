import { Component, OnInit } from '@angular/core';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Empresa } from '../../../interfaces/empresa';
import { FooterComponent } from '../../footer/footer.component';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../../../service/utils.service';
import { EmpresaDto } from '../../../interfaces/empresa-dto';
import { TecnologiaComponent } from './tecnologia/tecnologia.component';
import { ActivarODesactivarComponent } from '../../activar-o-desactivar/activar-o-desactivar.component';

@Component({
  selector: 'app-perfil-empresa',
  standalone: true,
  imports: [
    FormsModule,
    NgClass,
    HeaderEmpresaComponent,
    HeaderAlumnoComponent,
    HeaderAdministradorComponent,
    HeaderProfesorComponent,
    NgIf,
    NgFor,
    FooterComponent,
    RouterLink, 
    TecnologiaComponent, 
    ActivarODesactivarComponent
  ],
  templateUrl: './perfil-empresa.component.html',
  styleUrl: './perfil-empresa.component.scss',
})
export class PerfilEmpresaComponent implements OnInit {
  rol: string | undefined;
  id: any;
  empresa: Empresa | undefined;
  empresaDTO: EmpresaDto | undefined;
  inglesSolicitado: any;
  modalidadesTrabajo: any;
  resumen: any;
  pathSitioWeb: any;
  ubicaciones: any;


  inglesSolicitadoValue = ['IMPRESCINDIBLE', 'IMPORTANTE', 'NO_NECESARIO'];

  modalCambiosRealizados = 'modalCambiosRealizados';


  isModalidadPresente(modalidadesTrabajo: any, modalidad: any): boolean {
    let modalidadUpperSinTildes = modalidad
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toUpperCase();
    return modalidadesTrabajo.includes(modalidadUpperSinTildes);
  }

  form: any = {
    id: this.getId(),
    inglesSolicitado: null,
    modalidadesTrabajo: [],
    resumen: null,
    pathSitioWeb: null,
    ubicaciones: null,
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute, 
    private utilsService: UtilsService, 
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getEmpresa(this.id);
  }

  onCheckboxChange(event: any, modalidad: string) {
    if (event.target.checked) {
      this.form.modalidadesTrabajo.push(modalidad);
    } else {
      const index = this.form.modalidadesTrabajo.indexOf(modalidad);
      if (index > -1) {
        this.form.modalidadesTrabajo.splice(index, 1);
      }
    }
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  getEmpresa(id: number) {
    this.userService.getEmpresa(id).subscribe({
      next: (data) => {
        this.empresa = data as Empresa;
        this.initializeForm();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  initializeForm() {
    this.form = {
      id: this.empresa?.id,
      inglesSolicitado: this.empresa?.inglesSolicitado,
      modalidadesTrabajo: this.empresa?.modalidadesTrabajo,
      resumen: this.empresa?.resumen,
      pathSitioWeb: this.empresa?.pathSitioWeb,
    };
  }

  onSubmit() {    
    const {
      id,
      inglesSolicitado,
      modalidadesTrabajo,
      resumen,
      pathSitioWeb,
    } = this.form;

    const empresaDto: EmpresaDto = {
      id,
      modalidadesTrabajo,
      resumen,
      pathSitioWeb,
      inglesSolicitado,
    };

    console.log(JSON.stringify(empresaDto));

    this.userService.updateEmpresa(empresaDto).subscribe({
      next: () => {
        this.utilsService.abrirModal(this.modalCambiosRealizados);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }


  returnModalidadFirstLetterUpper(modalidadTrabajo:string) {
    return this.utilsService.returnFirstLetterUpper(modalidadTrabajo);
  }
}
