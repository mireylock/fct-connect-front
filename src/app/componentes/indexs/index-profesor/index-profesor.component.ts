import { Component } from '@angular/core';
import { BienvenidaComponent } from "../../bienvenida/bienvenida.component";

@Component({
    selector: 'app-index-profesor',
    standalone: true,
    templateUrl: './index-profesor.component.html',
    styleUrl: './index-profesor.component.scss',
    imports: [BienvenidaComponent]
})
export class IndexProfesorComponent {

}
