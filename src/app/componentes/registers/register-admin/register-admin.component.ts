import { Component } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../../footer/footer.component';
import { NgClass, NgIf, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UtilsService } from '../../../service/utils.service';

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
    // pathFoto: '../../../../assets/img/profile.png',
    pathFoto: "http://localhost:8080/v1/api/media/profile.png",
    rol:"administrador"
  };
  errorMessage: any;

  constructor(private authService:AuthService, private location:Location, private utilsService:UtilsService){}
  
  onSubmit(): void {
    const { email, password, rol, nombre, apellido1, apellido2, dni, pathFoto } = this.form;

    this.authService.registerAdmin(email, password, rol, nombre, apellido1, apellido2, dni, pathFoto).subscribe({
      next: () => {
        this.utilsService.abrirModal('modalRegistrado');
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
