import { Component, OnInit } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgFor, NgIf } from '@angular/common';
import { AuthService } from '../../../service/auth.service';
import { Solicitud } from '../../../interfaces/solicitud';
import { SolicitudService } from '../../../service/solicitud.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-list-solicitudes',
  standalone: true,
  imports: [
    HeaderAdministradorComponent,
    HeaderAlumnoComponent,
    HeaderEmpresaComponent,
    HeaderProfesorComponent,
    FooterComponent,
    NgIf,
    NgFor,
    RouterLink
  ],
  templateUrl: './list-solicitudes.component.html',
  styleUrl: './list-solicitudes.component.scss',
})
export class ListSolicitudesComponent implements OnInit {

  rol: string | undefined;

  solicitudesRecibidas: Solicitud[] = [];
  solicitudesEnviadas: Solicitud[] = [];
  solicitudesAceptadas: Solicitud[] = [];
  solicitudesRechazadas: Solicitud[] = [];
  id: any;

  tipoAlumnoEmpresa: string = 'ALUMNO_A_EMPRESA';
  tipoEmpresaAlumno: string = 'EMPRESA_A_ALUMNO';
  estadoEnviado: string = 'ENVIADA';
  estadoAceptado: string = 'ACEPTADA';
  estadoRechazado: string = 'RECHAZADA';

  constructor(
    public authService: AuthService,
    private solicitudService: SolicitudService, 
    private utilsService:UtilsService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.id = this.authService.getUser().id;

    if (this.rol == 'empresa') {
      this.getSolicitudesRecibidasEmpresa();

      this.getSolicitudesEnviadasEmpresa();
      this.getSolicitudesAceptadasEmpresa();
      this.getSolicitudesRechazadasEmpresa();
    } else if (this.rol == 'alumno') {
      this.getSolicitudesRecibidasAlumno();
      this.getSolicitudesEnviadasAlumno();
      this.getSolicitudesAceptadasAlumno();
      this.getSolicitudesRechazadasAlumno();
    }
  }

  getSections() {
    return [
      { title: 'Recibidas', data: this.solicitudesRecibidas },
      { title: 'Enviadas', data: this.solicitudesEnviadas },
      { title: 'Aceptadas', data: this.solicitudesAceptadas },
      { title: 'Rechazadas', data: this.solicitudesRechazadas },
    ];
  }

  // SOLICITUDES EMPRESA
  getSolicitudesRecibidasEmpresa() {
    this.solicitudService
      .getSolicitudesEmpresa(
        this.estadoEnviado,
        this.tipoAlumnoEmpresa,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesRecibidas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES RECIBIDAS EMPRESA');
        },
      });
  }

  getSolicitudesEnviadasEmpresa() {
    this.solicitudService
      .getSolicitudesEmpresa(
        this.estadoEnviado,
        this.tipoEmpresaAlumno,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesEnviadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES ENVIADAS EMPRESA');
        },
      });
  }

  getSolicitudesAceptadasEmpresa() {
    this.solicitudService
      .getSolicitudesEmpresa(
        this.estadoAceptado,
        this.tipoAlumnoEmpresa,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesAceptadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES ACEPTADAS EMPRESA');
        },
      });
  }

  getSolicitudesRechazadasEmpresa() {
    this.solicitudService
      .getSolicitudesEmpresa(
        this.estadoRechazado,
        this.tipoAlumnoEmpresa,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesRechazadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES RECHAZADAS EMPRESA');
        },
      });
  }

  // SOLICITUDES ALUMNO
  getSolicitudesRecibidasAlumno() {
    this.solicitudService
      .getSolicitudesAlumno(this.estadoEnviado, this.tipoEmpresaAlumno, this.id)
      .subscribe({
        next: (data) => {
          this.solicitudesRecibidas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES RECIBIDAS ALUMNO');
        },
      });
  }

  getSolicitudesEnviadasAlumno() {
    this.solicitudService
      .getSolicitudesAlumno(this.estadoEnviado, this.tipoAlumnoEmpresa, this.id)
      .subscribe({
        next: (data) => {
          this.solicitudesEnviadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES ENVIADAS ALUMNO');
        },
      });
  }

  getSolicitudesAceptadasAlumno() {
    this.solicitudService
      .getSolicitudesAlumno(
        this.estadoAceptado,
        this.tipoEmpresaAlumno,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesAceptadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES ACEPTADAS ALUMNO');
        },
      });
  }

  getSolicitudesRechazadasAlumno() {
    this.solicitudService
      .getSolicitudesAlumno(
        this.estadoRechazado,
        this.tipoEmpresaAlumno,
        this.id
      )
      .subscribe({
        next: (data) => {
          this.solicitudesRechazadas = data as Solicitud[];
        },
        error: (err) => {
          console.log(err + 'SOLICITUDES RECHAZADAS ALUMNO');
        },
      });
  }

  rechazarSolicitud(id: number) {
    const estado = 'RECHAZADA';
    const solicitudDTO = {
      id,
      estado,
    };
    this.solicitudService.updateSolicitud(solicitudDTO).subscribe({
      next: () => {
        this.abrirModalRechazada();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  aceptarSolicitud(id: number) {
    const estado = 'ACEPTADA';
    const solicitudDTO = {
      id,
      estado,
    };
    this.solicitudService.updateSolicitud(solicitudDTO).subscribe({
      next: () => {
        this.abrirModalAceptada();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  modalSolicitudAceptada:string='modalSolicitudAceptada';
  modalSolicitudRechazada:string='modalSolicitudRechazada'
  
  abrirModalAceptada(): void {
    this.utilsService.abrirModal(this.modalSolicitudAceptada)
  }

  abrirModalRechazada(): void {
    this.utilsService.abrirModal(this.modalSolicitudRechazada)
  }

  reload() {
    window.location.reload();
  }
}
