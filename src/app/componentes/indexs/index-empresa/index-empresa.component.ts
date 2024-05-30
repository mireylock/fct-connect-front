import { Component } from '@angular/core';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { SolicitudIndexComponent } from '../solicitud-index/solicitud-index.component';
import { ListParcialAlumnosComponent } from '../../listas-parciales/list-parcial-alumnos/list-parcial-alumnos.component';


@Component({
    selector: 'app-index-empresa',
    standalone: true,
    templateUrl: './index-empresa.component.html',
    styleUrl: './index-empresa.component.scss',
    imports: [BienvenidaComponent, SolicitudIndexComponent, ListParcialAlumnosComponent]
})
export class IndexEmpresaComponent {

}
