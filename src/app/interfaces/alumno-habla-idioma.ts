import { Alumno } from "./alumno";
import { Idioma } from "./idioma";

export interface AlumnoHablaIdioma {
    id:number;
    nivel:string;
    pathDiploma:string;
    descripcion:string;
    idioma:Idioma;    
    alumno:Alumno;
}
