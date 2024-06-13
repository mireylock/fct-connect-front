import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { TecnologiaDto } from '../interfaces/tecnologia-dto';

const URL_TECNOLOGIAS = 'https://fctconnect.vercel.app/v1/api/tecnologias';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class TecnologiaService {
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

  crearTecnologia(
    nombre: string,
    descripcion: string,
    idEmpresa: number
  ): Observable<any> {
    let tecnologia = {
      nombre: nombre,
      descripcion: descripcion,
      idEmpresa: idEmpresa,
    };

    return this.http.post<TecnologiaDto>(
      URL_TECNOLOGIAS,
      JSON.stringify(tecnologia),
      HTTPOPTIONS
    );
  }

  deleteTecnologia(id:number):Observable<any>{
    const url = `${URL_TECNOLOGIAS}/${id}`;
    return this.http.delete<TecnologiaDto>(url, HTTPOPTIONS)
    .pipe(catchError(this.handleError));
  }
}
