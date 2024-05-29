import { Tecnologia } from "./tecnologia";

export interface Empresa {
    id: number;
    email: string;
    password: string;
    nombre: string;
    pathFoto:string;
    resumen:string;
    pathSitioWeb:string;
    inglesSolicitado:string;
    modalidadesTrabajo:string[];
    tecnologias:Tecnologia[];
}
