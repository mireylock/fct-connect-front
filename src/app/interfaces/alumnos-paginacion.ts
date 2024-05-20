import { Alumno } from "./alumno";

export interface AlumnosPaginacion {
    totalItems: number;
    alumnos: Alumno[];
    totalPages: number;
    currentPage: number;
    
}

