import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

const URL_ALUMNOS="http://localhost:8080/v1/api/alumnos";
const URL_EMPRESAS="http://localhost:8080/v1/api/empresas";
const URL_PROFESORES="http://localhost:8080/v1/api/profesores";
const URL_ADMINISTRADORES="http://localhost:8080/v1/api/administradores";


const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  constructor(private http:HttpClient, private StorageService:StorageService) { };

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }


  getAlumno(id:number):Observable<Object>{
    return this.http.get(URL_ALUMNOS+'/'+id);
  }

  getEmpresa(id:number):Observable<Object>{
    return this.http.get(URL_EMPRESAS+'/'+id);
  }

  getProfesor(id:number):Observable<Object>{
    return this.http.get(URL_PROFESORES+'/'+id);
  }

  getAdministrador(id:number):Observable<Object>{
    return this.http.get(URL_ADMINISTRADORES+'/'+id);
  }


  
}
