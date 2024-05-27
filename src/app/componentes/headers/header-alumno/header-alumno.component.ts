import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-header-alumno',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-alumno.component.html',
  styleUrl: './header-alumno.component.scss'
})
export class HeaderAlumnoComponent {  
  
  isLoggedIn = true;

  constructor(private storageService:StorageService, private router:Router){}

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/']).then(
      () => {console.log('Logout OK, cargando página inicio...')}
    )
  }

}
