import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StorageService } from '../../service/storage.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-profile-modal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './profile-modal.component.html',
  styleUrl: './profile-modal.component.scss',
})
export class ProfileModalComponent implements OnInit {
  @ViewChild('modal', { static: true }) modal!: ElementRef;
  isLoggedIn = true;

  rol:string | undefined;
  id:string | undefined;

  constructor(private storageService:StorageService, private router: Router){}

  ngOnInit(): void {
    this.id = this.storageService.getUser().id;
    this.rol = this.storageService.getUser().rol;
  }

  

  logout(): void {
    this.storageService.clean();
    this.isLoggedIn = false;
    this.router.navigate(['/']).then(() => {
      console.log('Logout OK, cargando página inicio...');
    });
  }

  openModal(targetElement: HTMLElement) {
    const rect = targetElement.getBoundingClientRect();
    const modalElement = this.modal.nativeElement;
    modalElement.style.top = `${rect.bottom}px`;
    modalElement.style.left = `${rect.left}px`;
    modalElement.classList.add('show');
  }

  closeModal() {
    this.modal.nativeElement.classList.remove('show');
  }

  toggleModal(targetElement: HTMLElement) {
    if (this.modal.nativeElement.classList.contains('show')) {
      this.closeModal();
    } else {
      this.openModal(targetElement);
    }
  }
}
