import { Component, OnInit } from '@angular/core';
import { Alumno } from '../../interfaces/alumno';
import { UserService } from '../../service/user.service';
import { ActivatedRoute } from '@angular/router';
import { ProfesorTutorizaAlumno } from '../../interfaces/profesor-tutoriza-alumno';
import { NgFor } from '@angular/common';
import { HeaderAdministradorComponent } from '../headers/header-administrador/header-administrador.component';
import { FooterComponent } from '../footer/footer.component';
import { Profesor } from '../../interfaces/profesor';
import { FormsModule } from '@angular/forms';
import { TutoriaService } from '../../service/tutoria.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-tutoria',
  standalone: true,
  imports: [NgFor, HeaderAdministradorComponent, FooterComponent, FormsModule],
  templateUrl: './tutoria.component.html',
  styleUrl: './tutoria.component.scss',
})
export class TutoriaComponent implements OnInit {

  alumno: Alumno | undefined;
  tutorias: ProfesorTutorizaAlumno[] | undefined;
  profesores: Profesor[] | undefined;
  idAlumno: any;
  idProfesor: any;
  tipoTutoria: any;
  tiposTutoria: string[] = ['Prácticas', 'Proyecto'];
  modalTutoriaAdded:string = 'modalTutoriaAdded';
  modalEliminarTutoria:string='modalEliminarTutoria';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute, 
    private tutoriaService:TutoriaService,
    private utilsService:UtilsService
  ) {}

  ngOnInit(): void {
    this.idAlumno = this.getId();
    this.getAlumno(this.idAlumno);
    this.getProfesores();
  }

  agregarTutoria() {
    this.tutoriaService.crearTutoria(this.idProfesor, this.idAlumno, this.tipoTutoria).subscribe({
      next: () => {
        this.abrirModalTutoriaAdded();
      },
      error: (err) => {
        console.log(err);
      },
    });

  }

  eliminarTutoria(id:number) {
    this.tutoriaService.deleteTutoria(id).subscribe({
      next: () => {
        window.location.reload();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  abrirModalTutoriaAdded(): void {
    this.utilsService.abrirModal(this.modalTutoriaAdded);
  }
  

  abrirModalEliminar(id:number) {
    this.utilsService.abrirModal(this.modalEliminarTutoria+id);
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.idAlumno = params.get('id');
    });
    return this.idAlumno;
  }

  getAlumno(id: number) {
    this.userService.getAlumno(id).subscribe({
      next: (data) => {
        this.alumno = data as Alumno;
        this.tutorias = this.alumno.profesorTutorizaAlumnos;
      },
      error: (err) => {
        console.log(err + 'ALUMNO');
      },
    });
  }

  getProfesores() {
    this.userService.getAllProfesores().subscribe({
      next: (data) => {
        this.profesores = data as Profesor[];
      },
      error: (err) => {
        console.log(err + 'ALUMNO');
      },
    });
  }

  reload() {
    window.location.reload();
  }
}
