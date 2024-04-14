import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-header-profesor',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-profesor.component.html',
  styleUrl: './header-profesor.component.scss'
})
export class HeaderProfesorComponent {
  constructor(private storageService:StorageService, private router:Router){}

  isLoggedIn = true;

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/']).then(
      () => {console.log('Logout OK, cargando página inicio...')}
    )
  }
}
