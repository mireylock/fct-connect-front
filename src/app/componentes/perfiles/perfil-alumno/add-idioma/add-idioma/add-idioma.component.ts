import { Component, OnInit } from '@angular/core';
import { Idioma } from '../../../../../interfaces/idioma';
import { ActivatedRoute } from '@angular/router';
import { IdiomaService } from '../../../../../service/idioma.service';
import { Modal } from 'bootstrap';
import { Location, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../../../../interfaces/alumno';
import { UserService } from '../../../../../service/user.service';
import { SubidaArchivoComponent } from '../../../../subida-archivo/subida-archivo.component';

@Component({
  selector: 'app-add-idioma',
  standalone: true,
  imports: [FormsModule, NgFor, SubidaArchivoComponent],
  templateUrl: './add-idioma.component.html',
  styleUrl: './add-idioma.component.scss',
})
export class AddIdiomaComponent implements OnInit {
  idiomas: Idioma[] | undefined;

  nivel: any = '';
  pathDiploma: any;
  descripcion: any = '';
  idiomaId:any = '';
  alumnoId: any;

  niveles: string[] = ['PRINCIPIANTE', 'MEDIO', 'AVANZADO', 'NATIVO'];

  //subir archivo
  selectedFile: File | null = null;

  onFileSelected(file: File): void {
    this.selectedFile = file;
  }
  //////


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private idiomaService: IdiomaService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.getAllIdiomas();
    this.alumnoId = this.getId();
    
  }


  getId() {
    this.route.paramMap.subscribe((params) => {
      this.alumnoId = params.get('id');
    });
    return this.alumnoId;
  }

  getAllIdiomas() {
    this.idiomaService.getAllIdiomas().subscribe({
      next: (data) => {
        this.idiomas = data as Idioma[];
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addIdioma() {
    //subir archivo
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }
    ///////////////


    this.idiomaService
      .crearAlumnoHablaIdioma(
        this.nivel,
        this.pathDiploma,
        this.descripcion,
        this.idiomaId,
        this.alumnoId
      )
      .subscribe({
        next: () => {
          this.abrirModal();
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  goBack(): void {
    this.location.back();
  }

  abrirModal(): void {
    const modalElement = document.getElementById('modalSolicitudEnviada');
    if (modalElement) {
      const modal = new Modal(modalElement);
      modal.show();
    }
  }

  getCaracteresRestantes(): number {
    return 300 - this.descripcion.length;
  }

}
