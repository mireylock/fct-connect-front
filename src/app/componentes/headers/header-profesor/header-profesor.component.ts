import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';
import { Profesor } from '../../../interfaces/profesor';
import { ProfileModalComponent } from '../../profile-modal/profile-modal.component';
import { UserService } from '../../../service/user.service';

@Component({
  selector: 'app-header-profesor',
  standalone: true,
  imports: [RouterLink, ProfileModalComponent],
  templateUrl: './header-profesor.component.html',
  styleUrl: './header-profesor.component.scss'
})
export class HeaderProfesorComponent  implements OnInit {
  user: Profesor | undefined;

  @ViewChild(ProfileModalComponent) modalComponent!: ProfileModalComponent;
  
  isLoggedIn = true;

  constructor(
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    const userId = this.storageService.getUser().id;
    this.userService.getProfesor(userId).subscribe({
      next: (data) => {
        this.user = data as Profesor;
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
