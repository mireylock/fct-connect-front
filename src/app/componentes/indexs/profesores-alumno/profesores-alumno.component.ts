import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';
import { Profesor } from '../../../interfaces/profesor';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-profesores-alumno',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './profesores-alumno.component.html',
  styleUrl: './profesores-alumno.component.scss'
})
export class ProfesoresAlumnoComponent implements OnInit {

  profesoresTutoresAlumno:Profesor[] | undefined;

  constructor(private userService:UserService, private storageService:StorageService){}

  ngOnInit(): void {
    const idAlumno = this.storageService.getUser().id;
    this.getProfesoresTutoresAlumno(idAlumno);
    
  }

  getProfesoresTutoresAlumno(idAlumno:number) {
    this.userService.getProfesoresTutoresAlumno(idAlumno).subscribe({
      next: (data) => {
        this.profesoresTutoresAlumno = data as Profesor[];
        console.log(this.profesoresTutoresAlumno)
      }, 
      error: (err) => {
        console.log(err);
      }

    })
  }

}
