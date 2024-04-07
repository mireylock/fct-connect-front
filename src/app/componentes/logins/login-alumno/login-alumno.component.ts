import { Component, OnInit } from '@angular/core';
import { HeaderLandingComponent } from '../../headers/header-landing/header-landing.component';
import { FooterComponent } from '../../footer/footer.component';
import { AuthService } from '../../../service/auth.service';
import { StorageService } from '../../../service/storage.service';
import { Router } from '@angular/router';
import { NgClass, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-alumno',
  standalone: true,
  imports: [HeaderLandingComponent, FooterComponent, NgClass, NgIf, FormsModule],
  templateUrl: './login-alumno.component.html',
  styleUrl: './login-alumno.component.scss'
})
export class LoginAlumnoComponent implements OnInit {
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
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      });
    }
  
    reloadPage(): void {
      window.location.reload();
    }
}
