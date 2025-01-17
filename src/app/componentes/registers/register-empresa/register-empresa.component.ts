import { Component } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { UserService } from '../../../service/user.service';
import { NgFor, NgIf } from '@angular/common';
import { EmpresaRequest } from '../../../interfaces/empresaRequest';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { UtilsService } from '../../../service/utils.service';

@Component({
  selector: 'app-register-empresa',
  standalone: true,
  imports: [HeaderAdministradorComponent, FooterComponent, NgFor, NgIf, RouterLink],
  templateUrl: './register-empresa.component.html',
  styleUrl: './register-empresa.component.scss'
})
export class RegisterEmpresaComponent {

  empresasRequest:EmpresaRequest[]=[];
  errorMessage: any;
  // pathFoto:string = '../../../../assets/img/profile.png';
  pathFoto:string = "http://localhost:8080/v1/api/media/profile.png";
  errorAceptar:boolean=false;
  
  constructor(private userService:UserService, private authService:AuthService, private utilsService:UtilsService){
    this.userService.getRequestEmpresas().subscribe({
      next: (data) => {
        this.empresasRequest = data as EmpresaRequest[];
      }, 
      error: (err) => {
        console.log(err+'Request de empresas');
      }
    })
  }

  aceptarSolicitud(empresaRequest:EmpresaRequest) {
    this.authService.registerEmpresa(empresaRequest.email, empresaRequest.password, empresaRequest.nombre, this.pathFoto).subscribe({
      next: () => {
        this.userService.deleteRequestEmpresa(empresaRequest.id).subscribe({
          next: () => {
            console.log('Empresa request eliminada'+empresaRequest);
            this.abrirModalAceptada();
          },
          error: (error: any) => {
            console.log(error);
          }
        });
      }, 
      error: err => {
        this.errorMessage = err.error.message;
        this.abrirModalErronea();
      }    
    });
  }

  cancelarSolicitud(empresaRequest:EmpresaRequest) {
    this.userService.deleteRequestEmpresa(empresaRequest.id).subscribe({
      next: () => {
        console.log('Empresa request eliminada'+empresaRequest);
        this.abrirModalRechazada();
      },
      error: (error: any) => {
        console.log(error);
      }
    });

  }

  modalSolicitudAceptada:string='modalSolicitudAceptada';
  modalSolicitudErronea:string='modalSolicitudErronea';
  modalSolicitudRechazada:string='modalSolicitudRechazada';

  abrirModalAceptada(): void {
    this.utilsService.abrirModal(this.modalSolicitudAceptada);
  }

  abrirModalErronea(): void {
    this.utilsService.abrirModal(this.modalSolicitudErronea);
  }

  abrirModalRechazada(): void {
    this.utilsService.abrirModal(this.modalSolicitudRechazada);
  }

  reload() {
    window.location.reload();
  }

  


}
