export interface Administrador {
    id: number;
    dni:string;
    email: string;
    password: string;
    nombre: string;
    apellido1: string;
    apellido2?: string;
    telefono?:string;
    direccion?:string;
    pathFoto:string;
}
