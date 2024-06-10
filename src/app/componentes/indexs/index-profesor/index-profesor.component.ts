import { Component } from '@angular/core';
import { BienvenidaComponent } from '../bienvenida/bienvenida.component';
import { ListParcialAlumnosComponent } from '../../listas-parciales/list-parcial-alumnos/list-parcial-alumnos.component';
import { ListParcialEmpresasComponent } from '../../listas-parciales/list-parcial-empresas/list-parcial-empresas.component';
import { ListTutoriaParcialComponent } from './list-tutoria-parcial/list-tutoria-parcial.component';

@Component({
    selector: 'app-index-profesor',
    standalone: true,
    templateUrl: './index-profesor.component.html',
    styleUrl: './index-profesor.component.scss',
    imports: [BienvenidaComponent, ListTutoriaParcialComponent, ListParcialEmpresasComponent]
})
export class IndexProfesorComponent {

}
