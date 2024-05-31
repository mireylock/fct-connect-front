import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';
import { Administrador } from '../../../interfaces/administrador';
import { ProfileModalComponent } from '../../profile-modal/profile-modal.component';

@Component({
  selector: 'app-header-administrador',
  standalone: true,
  imports: [RouterLink, ProfileModalComponent],
  templateUrl: './header-administrador.component.html',
  styleUrl: './header-administrador.component.scss',
})
export class HeaderAdministradorComponent implements OnInit {
  user: Administrador | undefined;

  @ViewChild(ProfileModalComponent) modalComponent!: ProfileModalComponent;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.userService.getAdministrador(userId).subscribe({
      next: (data) => {
        this.user = data as Administrador;
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
