import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, catchError, of, tap, throwError } from 'rxjs';
import { Alumno } from '../interfaces/alumno';
import { Empresa } from '../interfaces/empresa';
import { Profesor } from '../interfaces/profesor';
import { Administrador } from '../interfaces/administrador';
import { UserService } from './user.service';
import { Formacion } from '../interfaces/formacion';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiAuthURL = 'http://localhost:8080/v1/api/auth/';
  private apiMailURL = 'http://localhost:8080/v1/api/';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService,
  ) {}

  getRol(): string | undefined {
    if (this.storageService.isLoggedIn()) {
      return this.storageService.getUser().rol;
    }
    return undefined;
  }

  getUser(): any {
    if (this.storageService.isLoggedIn()) {
      return this.storageService.getUser();
    }
  }

  login(email: string, password: string): Observable<any> {
    return this.httpClient.post(
      this.apiAuthURL + 'login-alumno',
      {
        email,
        password,
      },
      this.httpOptions
    );
  }

  registerAdmin(
    email: string,
    password: string,
    rol: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    dni: string,
    pathFoto: string, 
  ): Observable<any> {
    let registerRequest = {
      email: email,
      password: password,
      rol: rol,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      dni: dni,
      pathFoto: pathFoto,
    };

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(registerRequest),
      this.httpOptions
    );
  }

  registerProfesor(
    email: string,
    password: string,
    rol: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    dni: string,
    pathFoto: string, 
  ): Observable<any> {
    let registerRequest = {
      email: email,
      password: password,
      rol: rol,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      dni: dni,
      pathFoto: pathFoto,
    };

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(registerRequest),
      this.httpOptions
    );
  }

  registerAlumno(
    email: string,
    password: string,
    rol: string,
    nombre: string,
    apellido1: string,
    apellido2: string,
    dni: string,
    pathFoto: string, 
    carnetConducir:number,
    vehiculoPropio:number, 
    formacion:Formacion
  ): Observable<any> {
    let registerRequest = {
      email: email,
      password: password,
      rol: rol,
      nombre: nombre,
      apellido1: apellido1,
      apellido2: apellido2,
      dni: dni,
      pathFoto: pathFoto,
      carnetConducir: carnetConducir, 
      vehiculoPropio: vehiculoPropio, 
      formacion:formacion
    };

    console.log(JSON.stringify(registerRequest));

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(registerRequest),
      this.httpOptions
    );
  }

  requestEmpresa(
    email: string,
    password: string,
    nombre: string,
    pathFoto: string
  ) {
    let requestEmpresa = {
      email: email,
      password: password,
      nombre: nombre,
      pathFoto: pathFoto,
    };

    return this.httpClient.post(
      this.apiAuthURL + 'request-empresa',
      JSON.stringify(requestEmpresa),
      this.httpOptions
    );
  }

  registerEmpresa(
    email: string,
    password: string,
    nombre: string,
    pathFoto: string
  ): Observable<any> {
    let empresa = {
      email: email,
      password: password,
      rol: 'empresa',
      nombre: nombre,
      pathFoto: pathFoto,
    };

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(empresa),
      this.httpOptions
    );
  }

  mailRegisterEmpresa(email: string): Observable<any> {
    return this.httpClient.post(
      this.apiMailURL,
      JSON.stringify(email),
      this.httpOptions
    );
  }

  logout() {
    this.storageService.clean();
  }

  errorHandler(error: {
    error: { message: string };
    status: any;
    message: any;
  }) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }
}
