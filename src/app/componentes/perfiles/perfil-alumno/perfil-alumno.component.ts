import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-perfil-alumno',
  standalone: true,
  imports: [],
  templateUrl: './perfil-alumno.component.html',
  styleUrl: './perfil-alumno.component.scss'
})
export class PerfilAlumnoComponent implements OnInit {
  
  constructor(private userService:UserService){}


 
  ngOnInit(): void {
 
  }


  

}
