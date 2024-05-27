import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Alumno } from '../../../interfaces/alumno';
import { NgClass, NgFor } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-parcial-alumnos',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './list-parcial-alumnos.component.html',
  styleUrl: './list-parcial-alumnos.component.scss'
})
export class ListParcialAlumnosComponent implements OnInit{
  alumnos:Alumno[]=[];
  dbError:boolean=false;
  slides: any[][] = [];
  
  constructor(private userService:UserService, private router:Router){}

  ngOnInit(): void {
    this.getAlumnosSlider();
  }

  getAlumnosSlider() {
    this.userService.getSeisAlumnos().subscribe({
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

