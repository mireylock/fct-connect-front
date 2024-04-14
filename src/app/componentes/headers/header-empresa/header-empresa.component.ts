import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';

@Component({
  selector: 'app-header-empresa',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-empresa.component.html',
  styleUrl: './header-empresa.component.scss'
})
export class HeaderEmpresaComponent {
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
