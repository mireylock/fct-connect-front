import { Component } from '@angular/core';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-register-alumno',
  standalone: true,
  imports: [HeaderAdministradorComponent, FooterComponent, NgClass, NgIf, FormsModule],
  templateUrl: './register-alumno.component.html',
  styleUrl: './register-alumno.component.scss'
})
export class RegisterAlumnoComponent {

  form: any = {
    nombre:null, 
    apellido1:null, 
    apellido2:null,
    email: null,
    password: null, 
    rol:"alumno", 
    pathFoto:"../../../../assets/img/profile.png"
  };
  errorMessage: any;

  constructor(private authService:AuthService){}
  
  onSubmit(): void {
    const { email, password, rol, nombre, apellido1, apellido2, dni, pathFoto } = this.form;

    this.authService.register(email, password, rol, nombre, apellido1, apellido2, dni, pathFoto).subscribe({
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
