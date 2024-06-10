import { Component, OnInit } from '@angular/core';
import { Idioma } from '../../../../../interfaces/idioma';
import { ActivatedRoute } from '@angular/router';
import { IdiomaService } from '../../../../../service/idioma.service';
import { Location, NgClass, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Alumno } from '../../../../../interfaces/alumno';
import { UserService } from '../../../../../service/user.service';
import { SubidaArchivoComponent } from '../../../../subida-archivo/subida-archivo.component';
import { UtilsService } from '../../../../../service/utils.service';
import { MediaService } from '../../../../../service/media.service';

@Component({
  selector: 'app-add-idioma',
  standalone: true,
  imports: [FormsModule, NgFor, SubidaArchivoComponent, NgIf, NgClass],
  templateUrl: './add-idioma.component.html',
  styleUrl: './add-idioma.component.scss',
})
export class AddIdiomaComponent implements OnInit {
  idiomas: Idioma[] | undefined;

  nivel: any = '';
  pathDiploma: any;
  descripcion: any = '';
  idiomaId: any = '';
  alumnoId: any;

  niveles: string[] = ['PRINCIPIANTE', 'MEDIO', 'AVANZADO', 'NATIVO'];
  modalIdiomaAdded: string = 'modalIdiomaAdded';


  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private idiomaService: IdiomaService,
    private utilsService: UtilsService, 
    private mediaService: MediaService
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

  upload(event:any) {
    const file = event.target.files[0];

    if (file) {
      const formData = new FormData();

      formData.append('file', file);

      this.mediaService.uploadFile(formData).subscribe({
        next: (data) => {
          this.pathDiploma = data.url;
          console.log('pathDiploma: '+this.pathDiploma);
        },
        error: (err) => {
          console.log(err);
        },
      })
    }
  }



  addIdioma() {

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
    this.utilsService.abrirModal(this.modalIdiomaAdded);
  }

  getCaracteresRestantes(): number {
    return 300 - this.descripcion.length;
  }

  reload() {
    window.location.reload();
  }
}
