export interface Alumno {
    id: number;
    email: string;
    password: string;
    dni: string;
    nombre: string;
    apellido1: string;
    apellido2: string;
    telefono: string;
    direccion: string;
    pathCV?: string;
    pathExpediente?: string;
    carnetConducir?: number;
    vehiculoPropio?: number;
}
