import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListEmpresasInactivosComponent } from './list-empresas-inactivos.component';

describe('ListEmpresasInactivosComponent', () => {
  let component: ListEmpresasInactivosComponent;
  let fixture: ComponentFixture<ListEmpresasInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListEmpresasInactivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListEmpresasInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
