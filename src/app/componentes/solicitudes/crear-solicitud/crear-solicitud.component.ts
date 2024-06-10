import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Location } from '@angular/common';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';
import { Solicitud } from '../../../interfaces/solicitud';
import { SolicitudService } from '../../../service/solicitud.service';
import { Empresa } from '../../../interfaces/empresa';
import { Alumno } from '../../../interfaces/alumno';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-crear-solicitud',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './crear-solicitud.component.html',
  styleUrl: './crear-solicitud.component.scss',
})
export class CrearSolicitudComponent implements OnInit {
  descripcion: string = '';
  tipoSolicitud: string = 'empresa';
  estadoSolicitud: string = 'ENVIADA';
  idAlumno: any;
  idEmpresa: any;
  rol = this.authService.getRol();

  solicitud: Solicitud | undefined;

  constructor(
    private location: Location,
    private authService: AuthService,
    private route: ActivatedRoute,
    private solicitudService: SolicitudService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    if (this.rol == 'empresa') {
      this.tipoSolicitud = 'EMPRESA_A_ALUMNO';
      this.idEmpresa = this.authService.getUser().id;
      this.route.paramMap.subscribe((params) => {
        this.idAlumno = params.get('id');
      });
    } else if (this.rol == 'alumno') {
      this.tipoSolicitud = 'ALUMNO_A_EMPRESA';
      this.idAlumno = this.authService.getUser().id;
      this.route.paramMap.subscribe((params) => {
        this.idEmpresa = params.get('id');
      });
    }
  }

  enviarSolicitud() {
    this.solicitudService
      .crearSolicitud(
        this.descripcion,
        this.tipoSolicitud,
        this.estadoSolicitud,
        this.idAlumno,
        this.idEmpresa
      )
      .subscribe({
        next: () => {
          this.abrirModal();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  getCaracteresRestantes(): number {
    return 4000 - this.descripcion.length;
  }

  modalSolicitudEnviada: string = 'modalSolicitudEnviada';

  abrirModal(): void {
    this.utilsService.abrirModal(this.modalSolicitudEnviada);
  }
}
