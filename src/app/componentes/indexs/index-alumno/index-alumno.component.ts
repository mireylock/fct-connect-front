import { Component } from '@angular/core';
import { BienvenidaComponent } from "../../bienvenida/bienvenida.component";

@Component({
    selector: 'app-index-alumno',
    standalone: true,
    templateUrl: './index-alumno.component.html',
    styleUrl: './index-alumno.component.scss',
    imports: [BienvenidaComponent]
})
export class IndexAlumnoComponent {

}
