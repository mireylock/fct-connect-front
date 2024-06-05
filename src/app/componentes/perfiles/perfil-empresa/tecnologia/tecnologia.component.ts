import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Empresa } from '../../../../interfaces/empresa';
import { EmpresaDto } from '../../../../interfaces/empresa-dto';
import { AuthService } from '../../../../service/auth.service';
import { TecnologiaService } from '../../../../service/tecnologia.service';
import { UserService } from '../../../../service/user.service';
import { UtilsService } from '../../../../service/utils.service';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-tecnologia',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './tecnologia.component.html',
  styleUrl: './tecnologia.component.scss'
})
export class TecnologiaComponent implements OnInit {
  rol: string | undefined;
  id: any;
  empresa: Empresa | undefined;
  tecnologias: any;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute, 
    private utilsService: UtilsService, 
    private tecnologiaService:TecnologiaService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.id = this.getId();
    this.getEmpresa(this.id);
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  getEmpresa(id: number) {
    this.userService.getEmpresa(id).subscribe({
      next: (data) => {
        this.empresa = data as Empresa;
        this.tecnologias = this.empresa.tecnologias;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  modalEliminarTecnologia:string = 'modalEliminarTecnologia';

  abrirModal(idTecnologia:number) {
    this.utilsService.abrirModal(this.modalEliminarTecnologia+idTecnologia);
  }

  eliminarTecnologia(id:number) {
    this.tecnologiaService.deleteTecnologia(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });

  }

}
