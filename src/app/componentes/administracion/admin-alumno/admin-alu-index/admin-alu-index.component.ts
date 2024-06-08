import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ActivarODesactivarComponent } from '../../activar-o-desactivar/activar-o-desactivar.component';

@Component({
  selector: 'app-admin-alu-index',
  standalone: true,
  imports: [RouterLink, ActivarODesactivarComponent],
  templateUrl: './admin-alu-index.component.html',
  styleUrl: './admin-alu-index.component.scss',
})
export class AdminAluIndexComponent implements OnInit{
  id: any;

  constructor(private route: ActivatedRoute) {}
  
  ngOnInit(): void {
    this.id = this.getId();
  }

  getId() {
    this.route.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
    return this.id;
  }

}
