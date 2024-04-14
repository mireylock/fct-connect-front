import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-header-administrador',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-administrador.component.html',
  styleUrl: './header-administrador.component.scss'
})

export class HeaderAdministradorComponent {
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
