import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [HeaderAdministradorComponent, FooterComponent, NgClass, NgIf, FormsModule],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.scss'
})
export class RegisterAdminComponent {
  form: any = {
    nombre:null, 
    apellido1:null, 
    apellido2:null,
    email: null,
    password: null, 
    rol:"administrador"
  };
  errorMessage: any;

  constructor(private authService:AuthService){}
  
  onSubmit(): void {
    const { email, password, rol, nombre, apellido1, apellido2, dni } = this.form;

    this.authService.register(email, password, rol, nombre, apellido1, apellido2, dni).subscribe({
      next: data => {
        alert("Alumno registrado!");
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

}
