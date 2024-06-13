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
import { SolicitudEstadoDTO } from '../interfaces/solicitud-estado-dto';
import { SolicitudCrearDto } from '../interfaces/solicitud-crear-dto';

const URL_SOLICITUDES = 'https://fct-connect.onrender.com//v1/api/solicitudes';
const URL_SOLICITUDES_ALUMNO = 'https://fct-connect.onrender.com//v1/api/solicitudes/alu';
const URL_SOLICITUDES_EMPRESA = 'https://fct-connect.onrender.com//v1/api/solicitudes/emp';

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
    idAlumno: number,
    idEmpresa: number
  ): Observable<any> {
    let solicitudRecibida = {
      descripcion: descripcion,
      tipo: tipo,
      estado: estado,
      idAlumno: idAlumno,
      idEmpresa: idEmpresa,
    };

    return this.http.post<SolicitudCrearDto>(
      URL_SOLICITUDES,
      JSON.stringify(solicitudRecibida),
      HTTPOPTIONS
    );
  }

  //https://fct-connect.onrender.com//v1/api/solicitudes/alu?estado=ENVIADA&tipo=EMPRESA_A_ALUMNO&idAlumno=4
  getSolicitudesAlumno(
    estado: string,
    tipo: string,
    idAlumno: number
  ): Observable<Object> {
    return this.http.get(
      URL_SOLICITUDES_ALUMNO +
        '?estado=' +
        estado +
        '&tipo=' +
        tipo +
        '&id=' +
        idAlumno
    );
  }

  getSolicitudesEmpresa(
    estado: string,
    tipo: string,
    idEmpresa: number
  ): Observable<Object> {
    return this.http.get(
      URL_SOLICITUDES_EMPRESA +
        '?estado=' +
        estado +
        '&tipo=' +
        tipo +
        '&id=' +
        idEmpresa
    );
  }

  updateSolicitud(solicitudEstadoDTO: SolicitudEstadoDTO): Observable<Object> {
    const url = `${URL_SOLICITUDES}/${solicitudEstadoDTO.id}`;
    return this.http.put<SolicitudEstadoDTO>(url, solicitudEstadoDTO, HTTPOPTIONS);
  }
}
