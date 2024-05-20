import { Alumno } from "./alumno";
import { Idioma } from "./idioma";

export interface AlumnoHablaIdioma {
    pathDiploma:string;
    descripcion:string;
    alumno:Alumno;
    idioma:Idioma;    
}
