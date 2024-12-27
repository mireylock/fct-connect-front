import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, catchError, map, take, throwError } from 'rxjs';
import { AlumnoDTO } from '../interfaces/alumno-dto';
import { Modal } from 'bootstrap';
import { Empresa } from '../interfaces/empresa';
import { EmpresaDto } from '../interfaces/empresa-dto';
import { UsuarioDto } from '../interfaces/usuario-dto';
import { ProfesorDto } from '../interfaces/profesor-dto';

// const URL_ALUMNOS="https://fct-connect.onrender.com/v1/api/alumnos";
// const URL_EMPRESAS="https://fct-connect.onrender.com/v1/api/empresas";
// const URL_PROFESORES="https://fct-connect.onrender.com/v1/api/profesores";
// const URL_ADMINISTRADORES="https://fct-connect.onrender.com/v1/api/administradores";
// const URL_REQUEST_EMPRESAS="https://fct-connect.onrender.com/v1/api/auth/request-empresa";
// const URL_USERS="https://fct-connect.onrender.com/v1/api/users";

const URL_ALUMNOS="http://localhost:8080/v1/api/alumnos";
const URL_EMPRESAS="http://localhost:8080/v1/api/empresas";
const URL_PROFESORES="http://localhost:8080/v1/api/profesores";
const URL_ADMINISTRADORES="http://localhost:8080/v1/api/administradores";
const URL_REQUEST_EMPRESAS="http://localhost:8080/v1/api/auth/request-empresa";
const URL_USERS="http://localhost:8080/v1/api/users";

const HTTPOPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
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

  /////// USUARIOS /////////
  getUserActivationStatus(id:number):Observable<Object>{
    return this.http.get(URL_USERS+'/'+id);
  }

  changeUserActivation(usuarioDTO:UsuarioDto):Observable<Object>{
    const url = `${URL_USERS}/${usuarioDTO.id}`;
    return this.http.put<UsuarioDto>(url, usuarioDTO, HTTPOPTIONS);
  }

  /////// ALUMNOS /////////
  getAllAlumnos():Observable<Object>{
    return this.http.get(URL_ALUMNOS);
  }

  getSeisAlumnos(): Observable<Object[]> { 
    return this.http.get<Object[]>(URL_ALUMNOS) 
      .pipe(
        map(alumnos => alumnos.slice(0, 6)), 
        take(1)
      );
  }


  getBusquedaAlumnos(nombre:string, idioma:string, vehiculoPropio:string, pagina:number, tamanio:number):Observable<Object> {
    return this.http.get(URL_ALUMNOS+'?nombre='+nombre+'&idioma='+idioma+'&vehiculoPropio='+vehiculoPropio+'&pagina='+pagina+'&tamanio='+tamanio);
  }

  getBusquedaAlumnosInactivos(nombre:string, idioma:string, vehiculoPropio:string, pagina:number, tamanio:number):Observable<Object> {
    return this.http.get(URL_ALUMNOS+'/inactivos?nombre='+nombre+'&idioma='+idioma+'&vehiculoPropio='+vehiculoPropio+'&pagina='+pagina+'&tamanio='+tamanio);
  }
  
  getAlumno(id:number):Observable<Object>{
    return this.http.get(URL_ALUMNOS+'/'+id);
  }

  updateAlumno(alumnoDTO:AlumnoDTO):Observable<Object>{
    const url = `${URL_ALUMNOS}/${alumnoDTO.id}`;
    return this.http.put<AlumnoDTO>(url, alumnoDTO, HTTPOPTIONS);
  }


  
  /////// EMPRESAS /////////
  getAllEmpresas():Observable<Object>{
    return this.http.get(URL_EMPRESAS);
  }

  getSeisEmpresas(): Observable<Object[]> { 
    return this.http.get<Object[]>(URL_EMPRESAS) 
      .pipe(
        map(empresas => empresas.slice(0, 6)), 
        take(1)
      );
  }

  getEmpresa(id:number):Observable<Object>{
    return this.http.get(URL_EMPRESAS+'/'+id);
  }

  getRequestEmpresas():Observable<Object>{
    return this.http.get(URL_REQUEST_EMPRESAS);
  }

  deleteRequestEmpresa(id:number):Observable<Object> {
    const url = `${URL_REQUEST_EMPRESAS}/${id}`
    return this.http.delete(url, HTTPOPTIONS)
      .pipe(catchError(this.handleError));
  }

  getBusquedaEmpresas(nombre: string, modadliadTrabajo:string, inglesSolicitado:string, tecnologia:string, pagina:number, tamanio:number):Observable<Object>  {
    return this.http.get(URL_EMPRESAS+'?nombre='+nombre+'&modalidadTrabajo='+modadliadTrabajo+'&inglesSolicitado='+inglesSolicitado+'&tecnologia='+tecnologia+'&pagina='+pagina+'&tamanio='+tamanio);
  }

  
  getBusquedaEmpresasInactivas(nombre: string, modadliadTrabajo:string, inglesSolicitado:string, tecnologia:string, pagina:number, tamanio:number):Observable<Object>  {
    return this.http.get(URL_EMPRESAS+'/inactivas?nombre='+nombre+'&modalidadTrabajo='+modadliadTrabajo+'&inglesSolicitado='+inglesSolicitado+'&tecnologia='+tecnologia+'&pagina='+pagina+'&tamanio='+tamanio);
  }


  updateEmpresa(empresaDto:EmpresaDto):Observable<Object>{
    const url = `${URL_EMPRESAS}/${empresaDto.id}`;
    return this.http.put<AlumnoDTO>(url, empresaDto, HTTPOPTIONS);
  }


  /////// PROFESORES /////////
  getAllProfesores():Observable<Object>{
    return this.http.get(URL_PROFESORES);
  }

  getSeisProfesores(): Observable<Object[]> { 
    return this.http.get<Object[]>(URL_PROFESORES) 
      .pipe(
        map(profesores => profesores.slice(0, 6)), 
        take(1)
      );
  }

  getBusquedaProfesores(nombre:string, pagina:number, tamanio:number):Observable<Object> {
    return this.http.get(URL_PROFESORES+'?nombre='+nombre+'&pagina='+pagina+'&tamanio='+tamanio);
  }

  getBusquedaProfesoresInactivos(nombre:string, pagina:number, tamanio:number):Observable<Object> {
    return this.http.get(URL_PROFESORES+'/inactivos?nombre='+nombre+'&pagina='+pagina+'&tamanio='+tamanio);
  }


  getProfesor(id:number):Observable<Object>{
    return this.http.get(URL_PROFESORES+'/'+id);
  }

  updateProfesor(profesorDto:ProfesorDto):Observable<Object>{
    const url = `${URL_PROFESORES}/${profesorDto.id}`;
    return this.http.put<AlumnoDTO>(url, profesorDto, HTTPOPTIONS);
  }

  ////// ADMINISTRADOR //////
  getAdministrador(id:number):Observable<Object>{
    return this.http.get(URL_ADMINISTRADORES+'/'+id);
  }




  



  
}
