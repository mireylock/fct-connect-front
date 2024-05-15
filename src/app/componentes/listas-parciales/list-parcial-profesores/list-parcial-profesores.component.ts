import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profesor } from '../../../interfaces/profesor';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-parcial-profesores',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-parcial-profesores.component.html',
  styleUrl: './list-parcial-profesores.component.scss'
})
export class ListParcialProfesoresComponent {
  profesores:Profesor[]=[];

  dbError:boolean=false;

  constructor(private userService:UserService){
    this.userService.getSeisProfesores().subscribe({
      next: (data) => {
        this.profesores = data as Profesor[];
      }, 
      error: (err) => {
        console.log(err+'PROFESORES');
      }
    })
  }
}
