import { Profesor } from "./profesor";

export interface ProfesorTutorizaAlumno {
    id: number;
    tipoTutoria: string;
    profesor:Profesor;
}
