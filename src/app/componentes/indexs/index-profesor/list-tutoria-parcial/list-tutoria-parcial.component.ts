import { NgFor, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { Alumno } from '../../../../interfaces/alumno';
import { UserService } from '../../../../service/user.service';
import { TutoriaService } from '../../../../service/tutoria.service';
import { StorageService } from '../../../../service/storage.service';

@Component({
  selector: 'app-list-tutoria-parcial',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './list-tutoria-parcial.component.html',
  styleUrl: './list-tutoria-parcial.component.scss'
})
export class ListTutoriaParcialComponent {
  alumnos:Alumno[]=[];
  dbError:boolean=false;
  slides: any[][] = [];
  
  constructor(private tutoriaService:TutoriaService, private storageService:StorageService){}

  ngOnInit(): void {
    const idProfesor = this.storageService.getUser().id;
    this.getAlumnosSlider(idProfesor);
  }

  getAlumnosSlider(idProfesor:number) {
    this.tutoriaService.getAlumnosTutoriaProfesor(idProfesor).subscribe({
      next: (data) => {
        this.alumnos = data as Alumno[];
        console.log(this.alumnos);
        this.generateSlides();
      }, 
      error: (err) => {
        console.log(err+'ALUMNOS');
      }
    })
  }

  generateSlides(): void {
    const itemsPerSlide = 2;
    for (let i = 0; i < this.alumnos.length; i += itemsPerSlide) {
      this.slides.push(this.alumnos.slice(i, i + itemsPerSlide));
    }
  }

}
