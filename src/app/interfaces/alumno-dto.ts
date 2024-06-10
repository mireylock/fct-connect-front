import { Formacion } from "./formacion";

export interface AlumnoDTO {
    id:number;
    telefono?: string;
    direccion?: string;
    carnetConducir?: number;
    vehiculoPropio?: number;
    pathCV?:string;
    pathExpediente?:string;
    formacion:Formacion;
    pathFoto:string;
}
