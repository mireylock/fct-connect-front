import { Alumno } from "./alumno";
import { Idioma } from "./idioma";

export interface AlumnoHablaIdioma {
    nivel:string;
    pathDiploma:string;
    descripcion:string;
    idioma:Idioma;    
    alumno:Alumno;
}
