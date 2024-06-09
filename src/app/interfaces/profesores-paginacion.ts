import { Profesor } from "./profesor";

export interface ProfesoresPaginacion {
    totalItems: number;
    profesores: Profesor[];
    totalPages: number;
    currentPage: number;
}
