import { NgClass, NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { UserService } from '../../../service/user.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-list-parcial-empresas',
  standalone: true,
  imports: [NgFor, RouterLink, NgClass],
  templateUrl: './list-parcial-empresas.component.html',
  styleUrl: './list-parcial-empresas.component.scss'
})
export class ListParcialEmpresasComponent {
  empresas:Empresa[]=[];
  dbError:boolean=false;
  slides: any[][] = [];

  rol:string | undefined;
  
  constructor(private userService:UserService, private authService:AuthService){}

  ngOnInit(): void {
    this.getEmpresasSlider();
    this.rol = this.authService.getRol();
  }

  getEmpresasSlider() {
    this.userService.getSeisEmpresas().subscribe({
      next: (data) => {
        this.empresas = data as Empresa[];
        this.generateSlides();

      }, 
      error: (err) => {
        console.log(err+'EMPRESAS');
      }
    })
  }

  generateSlides(): void {
    const itemsPerSlide = 2;
    for (let i = 0; i < this.empresas.length; i += itemsPerSlide) {
      this.slides.push(this.empresas.slice(i, i + itemsPerSlide));
    }
  }
}
