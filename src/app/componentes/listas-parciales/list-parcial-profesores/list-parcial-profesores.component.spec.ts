import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcialProfesoresComponent } from './list-parcial-profesores.component';

describe('ListParcialProfesoresComponent', () => {
  let component: ListParcialProfesoresComponent;
  let fixture: ComponentFixture<ListParcialProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListParcialProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListParcialProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
