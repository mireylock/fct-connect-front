import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Empresa } from '../../../interfaces/empresa';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-list-parcial-empresas',
  standalone: true,
  imports: [NgFor, RouterLink],
  templateUrl: './list-parcial-empresas.component.html',
  styleUrl: './list-parcial-empresas.component.scss'
})
export class ListParcialEmpresasComponent {
  empresas:Empresa[]=[];

  dbError:boolean=false;

  constructor(private userService:UserService){
    this.userService.getTresEmpresas().subscribe({
      next: (data) => {
        this.empresas = data as Empresa[];
      }, 
      error: (err) => {
        console.log(err+'EMPRESAS');
      }
    })
  }
}
