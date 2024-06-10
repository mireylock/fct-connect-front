import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTotalAlumnosTutoriaComponent } from './list-total-alumnos-tutoria.component';

describe('ListTotalAlumnosTutoriaComponent', () => {
  let component: ListTotalAlumnosTutoriaComponent;
  let fixture: ComponentFixture<ListTotalAlumnosTutoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTotalAlumnosTutoriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTotalAlumnosTutoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
