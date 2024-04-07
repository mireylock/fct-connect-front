import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiAuthURL = "http://localhost:8080/v1/api/auth/";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private httpClient: HttpClient, private storageService: StorageService) { }

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

  register(email: string, password: string, rol: string): Observable<any> {
    let registerRequest = { 
      "email": email,
      "password": password,
      "rol": rol
    };

    return this.httpClient.post(
      this.apiAuthURL + 'register',
      JSON.stringify(registerRequest),
      this.httpOptions
    );
  }

  logout() {
    this.storageService.clean();
  }

  errorHandler(error: { error: { message: string; }; status: any; message: any; }) {

    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(() => errorMessage);
  }

}
