import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';
import { RouterLink } from '@angular/router';
import { ModalModule } from 'ngx-bootstrap/modal'; 


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
    pathFoto: "../../../../assets/img/profile.png"
  };

  errorMessage: any;
  solicitudEnviada:boolean=false;

  constructor(private authService:AuthService){}

  onSubmit(): void {
    const { email, password, nombre, pathFoto } = this.form;

    this.authService.requestEmpresa(email, password, nombre, pathFoto).subscribe({
      next: data => {
        this.solicitudEnviada = true;
        window.location.reload();
      },
      error: err => {
        // this.errorMessage = err.error.message;
        this.errorMessage = "Ha ocurrido un error"
      }
    });
  }

}
