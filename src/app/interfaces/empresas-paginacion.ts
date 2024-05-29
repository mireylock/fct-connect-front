import { Empresa } from "./empresa";

export interface EmpresasPaginacion {
    totalItems: number;
    empresas: Empresa[];
    totalPages: number;
    currentPage: number;
    
}
