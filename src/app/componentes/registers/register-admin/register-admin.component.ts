import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf, Location } from '@angular/common';
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
    pathFoto: "https://fct-connect.onrender.com//v1/api/media/profile.png",
    rol:"administrador"
  };
  errorMessage: any;

  constructor(private authService:AuthService, private location:Location){}
  
  onSubmit(): void {
    const { email, password, rol, nombre, apellido1, apellido2, dni, pathFoto } = this.form;

    this.authService.registerAdmin(email, password, rol, nombre, apellido1, apellido2, dni, pathFoto).subscribe({
      next: () => {


        window.location.reload();
      },
      error: err => {
        this.errorMessage = err.error.message;
      }
    });
  }

  goBack(): void {
    this.location.back();
  }

}
