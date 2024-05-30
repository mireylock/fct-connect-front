import { Component } from '@angular/core';
import { ListParcialEmpresasComponent } from "../../listas-parciales/list-parcial-empresas/list-parcial-empresas.component";
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { SolicitudIndexComponent } from '../solicitud-index/solicitud-index.component';
import { ProfesoresAlumnoComponent } from '../profesores-alumno/profesores-alumno.component';

@Component({
    selector: 'app-index-alumno',
    standalone: true,
    templateUrl: './index-alumno.component.html',
    styleUrl: './index-alumno.component.scss',
    imports: [BienvenidaComponent, ListParcialEmpresasComponent, SolicitudIndexComponent, ProfesoresAlumnoComponent]
})
export class IndexAlumnoComponent {

}
