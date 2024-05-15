import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { FormsModule } from '@angular/forms';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-register-profesor',
  standalone: true,
  imports: [HeaderAdministradorComponent, FooterComponent, NgClass, NgIf, FormsModule],
  templateUrl: './register-profesor.component.html',
  styleUrl: './register-profesor.component.scss'
})
export class RegisterProfesorComponent {
  form: any = {
    nombre:null, 
    apellido1:null, 
    apellido2:null,
    email: null,
    password: null, 
    pathFoto: "../../../../assets/img/profile.png",
    rol:"profesor"
  };
  errorMessage: any;

  constructor(private authService:AuthService){}
  
  onSubmit(): void {
    const { email, password, rol, nombre, apellido1, apellido2, dni, pathFoto } = this.form;

    this.authService.register(email, password, rol, nombre, apellido1, apellido2, dni, pathFoto).subscribe({
      next: data => {
        alert("Profesor registrado!");
        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }
}
