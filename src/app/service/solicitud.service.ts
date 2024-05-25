import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { Solicitud } from '../interfaces/solicitud';
import { Alumno } from '../interfaces/alumno';
import { Empresa } from '../interfaces/empresa';

const URL_SOLICITUD = 'http://localhost:8080/v1/api/solicitudes';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class SolicitudService {
  constructor(private http: HttpClient) {}

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `,
        error.error
      );
    }
    // Return an observable with a user-facing error message.
    return throwError(
      () => new Error('Something bad happened; please try again later.')
    );
  }

  crearSolicitud(
    descripcion: string,
    tipo: string,
    estado: string,
    alumno: Alumno,
    empresa: Empresa
  ): Observable<any> {
    let solicitudRecibida = {
      descripcion: descripcion,
      tipo: tipo,
      estado: estado,
      alumno: alumno,
      empresa: empresa,
    };

    return this.http.post<Solicitud>(
      URL_SOLICITUD,
      JSON.stringify(solicitudRecibida),
      HTTPOPTIONS
    );
  }
}
