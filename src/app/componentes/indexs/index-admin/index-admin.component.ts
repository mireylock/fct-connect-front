import { Component } from '@angular/core';
import { BienvenidaComponent } from '../../bienvenida/bienvenida.component';
import { ListParcialAlumnosComponent } from '../../listas-parciales/list-parcial-alumnos/list-parcial-alumnos.component';
import { ListParcialEmpresasComponent } from '../../listas-parciales/list-parcial-empresas/list-parcial-empresas.component';
import { ListParcialProfesoresComponent } from '../../listas-parciales/list-parcial-profesores/list-parcial-profesores.component';

@Component({
    selector: 'app-index-admin',
    standalone: true,
    templateUrl: './index-admin.component.html',
    styleUrl: './index-admin.component.scss',
    imports: [BienvenidaComponent, ListParcialAlumnosComponent, ListParcialEmpresasComponent, ListParcialProfesoresComponent]
})
export class IndexAdminComponent {

}
