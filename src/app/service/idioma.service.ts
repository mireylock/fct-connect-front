import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';

const URL_IDIOMAS="http://localhost:8080/v1/api/idiomas";

@Injectable({
  providedIn: 'root'
})
export class IdiomaService {

  constructor(private http:HttpClient) { };

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

  getAllIdiomas():Observable<Object>{
    return this.http.get(URL_IDIOMAS);
  }



}
