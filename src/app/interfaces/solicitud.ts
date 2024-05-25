import { Alumno } from "./alumno";
import { Empresa } from "./empresa";

export interface Solicitud {
    id: number;
    descripcion: string;
    tipo: string;
    estado: string;
    alumno:Alumno;
    empresa:Empresa;
}
