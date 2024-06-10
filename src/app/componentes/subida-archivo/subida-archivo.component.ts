import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MediaService } from '../../service/media.service';

@Component({
  selector: 'app-subida-archivo',
  standalone: true,
  imports: [],
  templateUrl: './subida-archivo.component.html',
  styleUrl: './subida-archivo.component.scss'
})
export class SubidaArchivoComponent {

  url:string | undefined;

  constructor(private mediaService:MediaService){}

  upload(event:any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (data) => {
          this.url = data.url;
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }
}
