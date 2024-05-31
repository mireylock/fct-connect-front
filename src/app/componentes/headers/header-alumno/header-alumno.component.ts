import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { StorageService } from '../../../service/storage.service';
import { UserService } from '../../../service/user.service';
import { Alumno } from '../../../interfaces/alumno';
import { ProfileModalComponent } from '../../profile-modal/profile-modal.component';

@Component({
  selector: 'app-header-alumno',
  standalone: true,
  imports: [RouterLink, ProfileModalComponent],
  templateUrl: './header-alumno.component.html',
  styleUrl: './header-alumno.component.scss'
})
export class HeaderAlumnoComponent implements OnInit {
  user: Alumno | undefined;

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
        this.user = data as Alumno;
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
