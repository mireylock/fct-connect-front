import { HttpHeaders, HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError, Observable, catchError } from 'rxjs';
import { TutoriaDto } from '../interfaces/tutoria-dto';

const URL_TUTORIAS = 'https://fctconnect.vercel.app/v1/api/tutorias';

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root'
})
export class TutoriaService {

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

  crearTutoria(
    idProfesor:number, 
    idAlumno:number, 
    tipoTutoria:string
  ): Observable<any> {
    let tutoria = {
      idProfesor:idProfesor,
      idAlumno:idAlumno, 
      tipoTutoria:tipoTutoria,
    };

    return this.http.post<TutoriaDto>(
      URL_TUTORIAS,
      JSON.stringify(tutoria),
      HTTPOPTIONS
    );
  }

  deleteTutoria(id:number):Observable<any>{
    const url = `${URL_TUTORIAS}/${id}`;
    return this.http.delete<TutoriaDto>(url, HTTPOPTIONS)
    .pipe(catchError(this.handleError));
  }

  getAlumnosTutoriaProfesor(idProfesor:number):Observable<any>{
    return this.http.get(URL_TUTORIAS+'/'+idProfesor);
  }

  getBusquedaAlumnosTutoriaProfesor(idProfesor:number, nombreAlumno:string, pagina:number, tamanio:number):Observable<any>{
    return this.http.get(URL_TUTORIAS+'/search/'+idProfesor+"?nombre="+nombreAlumno+'&pagina='+pagina+'&tamanio='+tamanio);
  }
}
