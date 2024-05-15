import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcialEmpresasComponent } from './list-parcial-empresas.component';

describe('ListParcialEmpresasComponent', () => {
  let component: ListParcialEmpresasComponent;
  let fixture: ComponentFixture<ListParcialEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListParcialEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListParcialEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
