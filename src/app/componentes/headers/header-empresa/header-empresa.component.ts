import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';
import { Empresa } from '../../../interfaces/empresa';
import { ProfileModalComponent } from '../../profile-modal/profile-modal.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-header-empresa',
  standalone: true,
  imports: [RouterLink, ProfileModalComponent],
  templateUrl: './header-empresa.component.html',
  styleUrl: './header-empresa.component.scss'
})
export class HeaderEmpresaComponent implements OnInit {
  user: Empresa | undefined;

  @ViewChild(ProfileModalComponent) modalComponent!: ProfileModalComponent;
  
  isLoggedIn = true;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.userService.getAlumno(userId).subscribe({
      next: (data) => {
        this.user = data as Empresa;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  toggleModal(event: Event) {
    const targetElement = event.target as HTMLElement;
    this.modalComponent.toggleModal(targetElement);
  }

}
