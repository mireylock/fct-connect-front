import { AlumnoHablaIdioma } from "./alumno-habla-idioma";
import { Formacion } from "./formacion";
import { Idioma } from "./idioma";

export interface Alumno {
    id: number;
    email: string;
    password: string;
    dni: string;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    pathFoto:string;
    telefono?: string;
    direccion?: string;
    pathCV?: string;
    pathExpediente?: string;
    carnetConducir?: number;
    vehiculoPropio?: number;
    formacion?: Formacion;
    idiomas?:Idioma[];
}
