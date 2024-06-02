import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-subida-archivo',
  standalone: true,
  imports: [],
  templateUrl: './subida-archivo.component.html',
  styleUrl: './subida-archivo.component.scss'
})
export class SubidaArchivoComponent {

  @Output() fileSelected = new EventEmitter<File>();

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.fileSelected.emit(file);
    }


    
  // selectedFile: File | null = null;

  // onFileSelected(event: Event): void {
  //   const input = event.target as HTMLInputElement;
  //   if (input.files && input.files.length > 0) {
  //     this.selectedFile = input.files[0];
  //   }
  // }

  // onSubmit(): void {
  //   if (this.selectedFile) {
  //     const formData = new FormData();
  //     formData.append('file', this.selectedFile, this.selectedFile.name);
      
  //     // Aquí puedes enviar el formData a tu servidor
  //     // Ejemplo:
  //     // this.http.post('TU_URL', formData).subscribe(response => {
  //     //   console.log('Respuesta del servidor:', response);
  //     // });

  //     console.log(`Archivo seleccionado: ${this.selectedFile.name}`);
  //   } else {
  //     console.log('No se ha seleccionado ningún archivo');
  //   }
  // }
  }
}
