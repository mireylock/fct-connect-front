import { Asignatura } from "./asignatura";
import { ProfesorTutorizaAlumno } from "./profesor-tutoriza-alumno";

export interface Profesor {
    id: number;
    email: string;
    password: string;
    dni:string;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    telefono?: string;
    pathFoto:string;
    direccion:string;
    departamento:string;
    asignaturas:Asignatura[];
}
