import { NgFor, Location, NgIf, NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Tecnologia } from '../../../../interfaces/tecnologia';
import { TecnologiaService } from '../../../../service/tecnologia.service';
import { UtilsService } from '../../../../service/utils.service';
import { AuthService } from '../../../../service/auth.service';

@Component({
  selector: 'app-add-tecnologia',
  standalone: true,
  imports: [NgFor, FormsModule, NgIf, NgClass],
  templateUrl: './add-tecnologia.component.html',
  styleUrl: './add-tecnologia.component.scss',
})
export class AddTecnologiaComponent implements OnInit{
  rol: string | undefined;
  idEmpresa:any;
  tecnologiaId:any;
  nombre: string = '';   
  descripcion: any = '';

  tecnologias:Tecnologia[] | undefined;

  constructor(private location: Location, private authService:AuthService, private route: ActivatedRoute, private tecnologiaService:TecnologiaService, private utilsService:UtilsService) {}
  
  ngOnInit(): void {
    this.idEmpresa = this.getId();
    this.rol = this.authService.getRol();
  }

  goBack(): void {
    this.location.back();
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.idEmpresa = params.get('id');
    });
    return this.idEmpresa;
  }

  addTecnologia() {
    this.tecnologiaService.crearTecnologia(this.nombre, this.descripcion, this.idEmpresa).subscribe({
      next: () => {
        this.abrirModal();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  modalTecnologiaAdded:string = 'modalTecnologiaAdded';

  abrirModal(): void {
    this.utilsService.abrirModal(this.modalTecnologiaAdded);
  }
}
