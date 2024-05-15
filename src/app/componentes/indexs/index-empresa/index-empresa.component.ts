import { Component } from '@angular/core';
import { BienvenidaComponent } from "../../bienvenida/bienvenida.component";

@Component({
    selector: 'app-index-empresa',
    standalone: true,
    templateUrl: './index-empresa.component.html',
    styleUrl: './index-empresa.component.scss',
    imports: [BienvenidaComponent]
})
export class IndexEmpresaComponent {

}
