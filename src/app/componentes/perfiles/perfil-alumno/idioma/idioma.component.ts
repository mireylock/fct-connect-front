import { Component, OnInit } from '@angular/core';
import { IdiomaService } from '../../../../service/idioma.service';
import { UtilsService } from '../../../../service/utils.service';
import { AuthService } from '../../../../service/auth.service';
import { Alumno } from '../../../../interfaces/alumno';
import { UserService } from '../../../../service/user.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-idioma',
  standalone: true,
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './idioma.component.html',
  styleUrl: './idioma.component.scss',
})
export class IdiomaComponent implements OnInit {
  rol: string | undefined;
  alumno: Alumno | undefined;
  modalEliminarIdioma = 'modalEliminarIdioma';
  id:any;

  constructor(
    private idiomaService: IdiomaService,
    private utilsService: UtilsService,
    private authService: AuthService,
    private userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.id = this.getId();
    this.getAlumno(this.id);
  }

  getAlumno(id: number) {
    this.userService.getAlumno(id).subscribe({
      next: (data) => {
        this.alumno = data as Alumno;
      },
      error: (err) => {
        console.log(err + 'ALUMNO');
      },
    });
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  eliminarIdioma(id: number) {
    this.idiomaService.deleteAlumnoHablaIdioma(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  returnNivelIdiomaFirstLetterUpper(nivelIdioma: string) {
    return this.utilsService.returnFirstLetterUpper(nivelIdioma);
  }

  abrirModal(idIdioma:number) {
    this.utilsService.abrirModal(this.modalEliminarIdioma+idIdioma);
  }
}
