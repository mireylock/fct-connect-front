import { Component } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { Alumno } from '../../../interfaces/alumno';
import { NgFor } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-list-parcial-alumnos',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-parcial-alumnos.component.html',
  styleUrl: './list-parcial-alumnos.component.scss'
})
export class ListParcialAlumnosComponent {
  alumnos:Alumno[]=[];

  dbError:boolean=false;

  constructor(private userService:UserService){
    this.userService.getSeisAlumnos().subscribe({
      next: (data) => {
        this.alumnos = data as Alumno[];
      }, 
      error: (err) => {
        console.log(err+'ALUMNOS');
      }
    })
  }
}

