import { NgFor, NgIf, NgClass, Location } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Administrador } from '../../../interfaces/administrador';
import { AuthService } from '../../../service/auth.service';
import { UserService } from '../../../service/user.service';
import { UtilsService } from '../../../service/utils.service';
import { ActivarODesactivarComponent } from '../../activar-o-desactivar/activar-o-desactivar.component';
import { FooterComponent } from '../../footer/footer.component';
import { HeaderAdministradorComponent } from '../../headers/header-administrador/header-administrador.component';
import { HeaderAlumnoComponent } from '../../headers/header-alumno/header-alumno.component';
import { HeaderEmpresaComponent } from '../../headers/header-empresa/header-empresa.component';
import { HeaderProfesorComponent } from '../../headers/header-profesor/header-profesor.component';

@Component({
  selector: 'app-perfil-administrador',
  standalone: true,
  imports: [
    NgFor,
    NgIf,
    NgClass,
    FormsModule,
    RouterLink,
    HeaderProfesorComponent,
    HeaderEmpresaComponent,
    HeaderAlumnoComponent,
    HeaderAdministradorComponent,
    FooterComponent,
    ActivarODesactivarComponent
  ],  templateUrl: './perfil-administrador.component.html',
  styleUrl: './perfil-administrador.component.scss'
})
export class PerfilAdministradorComponent {

  rol: string | undefined;
  id: any;
  administrador: Administrador | undefined;
  modalCambiosRealizados = 'modalCambiosRealizados';

  formPersonalData: any = {
    id: this.getId(),
    telefono: null,
    direccion: null,
  };

  constructor(
    private location: Location,
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.rol = this.authService.getRol();
    this.getAdministrador(this.id);
  }

  goBack(): void {
    this.location.back();
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  getAdministrador(id: number) {
    this.userService.getAdministrador(id).subscribe({
      next: (data) => {
        this.administrador = data as Administrador;
        this.initializeFormPersonalData();
      },
      error: (err) => {
        console.log(err + 'ADMINISTRADOR');
      },
    });
  }

  initializeFormPersonalData() {
    this.formPersonalData = {
      id: this.administrador?.id,
      telefono: this.administrador?.telefono,
      direccion: this.administrador?.direccion,
    };
  }

}
