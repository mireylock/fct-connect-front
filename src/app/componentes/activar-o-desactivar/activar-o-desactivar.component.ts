import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgIf } from '@angular/common';
import { UserService } from '../../service/user.service';
import { UtilsService } from '../../service/utils.service';

@Component({
  selector: 'app-activar-o-desactivar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './activar-o-desactivar.component.html',
  styleUrl: './activar-o-desactivar.component.scss',
})
export class ActivarODesactivarComponent {
  id: any;
  isActivo: any;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private utilsService: UtilsService
  ) {}

  ngOnInit(): void {
    this.id = this.getId();
    this.isActivo = this.userService
      .getUserActivationStatus(this.id)
      .subscribe({
        next: (data) => {
          this.isActivo = data as Boolean;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

  changeActivation() {
    const usuarioDto = {
      id: this.id,
      activo: !this.isActivo,
    };

    this.userService.changeUserActivation(usuarioDto).subscribe({
      next: () => {
        this.utilsService.abrirModal('modalEstadoCuenta');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reload() {
    window.location.reload();
  }
}
