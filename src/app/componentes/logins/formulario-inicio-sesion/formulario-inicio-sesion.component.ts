import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../service/auth.service';
import { StorageService } from '../../../service/storage.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-formulario-inicio-sesion',
  standalone: true,
  imports: [NgClass, NgIf, FormsModule],
  templateUrl: './formulario-inicio-sesion.component.html',
  styleUrl: './formulario-inicio-sesion.component.scss'
})
export class FormularioInicioSesionComponent implements OnInit {
  form: any = {
    email: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  rol: string = '';

  constructor(private authService: AuthService,
              private storageService: StorageService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.rol = this.storageService.getUser().rol;
      this.router.navigateByUrl('index').then(() => {console.log('Ya logueado, cargando index.')});
    }
  }

  onSubmit(): void {
    const { email, password } = this.form;

    this.authService.login(email, password).subscribe({
      next: data => {
        this.storageService.clean();
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        console.log('isLoggedIn = '+ this.isLoggedIn);
        this.rol = this.storageService.getUser().rol;
        this.reloadPage();
      },
      error: err => {
        if (err.status === 401) {
          this.errorMessage = 'Email o contraseña incorrectos'; 
        } else {
          this.errorMessage = "Ha ocurrido un error";
        }
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }

}
