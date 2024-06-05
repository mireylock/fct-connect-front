import { Tecnologia } from "./tecnologia";

export interface Empresa {
    id: number;
    email: string;
    password: string;
    nombre: string;
    pathFoto:string;
    inglesSolicitado:string;
    modalidadesTrabajo:string[];
    resumen:string;
    pathSitioWeb:string;
    tecnologias:Tecnologia[];
}
