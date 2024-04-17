import { Component } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-request-empresa',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, NgClass, NgIf, FormsModule],
  templateUrl: './request-empresa.component.html',
  styleUrl: './request-empresa.component.scss'
})
export class RequestEmpresaComponent {

  form: any = {
    nombre:null, 
    email: null,
    password: null, 
  };

  errorMessage: any;

  constructor(private authService:AuthService){}

  onSubmit(): void {
    const { email, password, nombre } = this.form;

    this.authService.requestEmpresa(email, password, nombre).subscribe({
      next: data => {
        alert("Solicitud enviada!");
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

}
