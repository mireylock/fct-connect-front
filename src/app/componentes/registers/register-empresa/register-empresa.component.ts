import { Component } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { UserService } from '../../../service/user.service';
import { NgFor } from '@angular/common';
import { EmpresaRequest } from '../../../interfaces/empresaRequest';
import { Empresa } from '../../../interfaces/empresa';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register-empresa',
  standalone: true,
  imports: [HeaderAdministradorComponent, FooterComponent, NgFor],
  templateUrl: './register-empresa.component.html',
  styleUrl: './register-empresa.component.scss'
})
export class RegisterEmpresaComponent {

  empresasRequest:EmpresaRequest[]=[];
  errorMessage: any;
  
  constructor(private userService:UserService, private authService:AuthService){
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
    this.authService.registerEmpresa(empresaRequest.email, empresaRequest.password, empresaRequest.nombre).subscribe({
      next: data => {
        
        this.userService.deleteRequestEmpresa(empresaRequest.id).subscribe({
          next: () => {
            console.log('Empresa request eliminada'+empresaRequest);
          },
          error: (error: any) => {
            console.log(error);
          }
        });
        
        alert("Solicitud aceptada!");
        window.location.reload();
      }, 
      error: err => {
        this.errorMessage = err.error.message;
      }    
    });
  }

  cancelarSolicitud(empresaRequest:EmpresaRequest) {

  }

  


}
