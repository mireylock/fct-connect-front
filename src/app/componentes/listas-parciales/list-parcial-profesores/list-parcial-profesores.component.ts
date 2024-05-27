import { NgClass, NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profesor } from '../../../interfaces/profesor';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-parcial-profesores',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './list-parcial-profesores.component.html',
  styleUrl: './list-parcial-profesores.component.scss',
})
export class ListParcialProfesoresComponent implements OnInit {
  profesores: Profesor[] = [];
  dbError: boolean = false;
  slides: any[][] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getProfesoresSlider();
  }

  getProfesoresSlider() {
    this.userService.getSeisProfesores().subscribe({
      next: (data) => {
        this.profesores = data as Profesor[];
        this.generateSlides();
      },
      error: (err) => {
        console.log(err + 'PROFESORES');
      },
    });
  }

  generateSlides(): void {
    const itemsPerSlide = 2;
    for (let i = 0; i < this.profesores.length; i += itemsPerSlide) {
      this.slides.push(this.profesores.slice(i, i + itemsPerSlide));
    }
  }
}
