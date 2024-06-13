import { ChangeDetectorRef, Component, EventEmitter, Output } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { MailServiceService } from '../../../service/mail-service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UtilsService } from '../../../service/utils.service';


@Component({
  selector: 'app-request-empresa',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, NgClass, NgIf, FormsModule, RouterLink],
  templateUrl: './request-empresa.component.html',
  styleUrl: './request-empresa.component.scss'
})


export class RequestEmpresaComponent {
    
  form: any = {
    nombre:null, 
    email: null,
    password: null, 
    pathFoto: '../../../../assets/img/profile.png'
  };

  errorMessage: any;
  solicitudEnviada:boolean=false;

  constructor(private authService:AuthService, private cdr: ChangeDetectorRef, private mailService:MailServiceService, private utilsService:UtilsService){}

  onSubmit(): void {
    const { email, password, nombre, pathFoto } = this.form;

    this.authService.requestEmpresa(email, password, nombre, pathFoto).subscribe({
      next: () => {
        this.solicitudEnviada = true;
        this.enviarMensaje();
        this.abrirModal();
      },
      error: err => {
        // this.errorMessage = err.error.message;
        this.errorMessage = "Ha ocurrido un error"
      }
    });
  } 

  modalSolicitudEnviada:string='modalSolicitudEnviada';

  abrirModal(): void {
    this.utilsService.abrirModal(this.modalSolicitudEnviada);
  }

  enviarMensaje() {
    this.mailService.sendMail(this.form).subscribe({
      next: () => {
      },
      error: (error: HttpErrorResponse) => {
        let s: string;
        s = error.error;
        s = s.substring(0, s.indexOf(' at '));
        console.error(s, error.message);
      }
    });
  }

}
