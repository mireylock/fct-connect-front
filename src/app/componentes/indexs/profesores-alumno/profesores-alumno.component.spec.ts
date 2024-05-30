import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesoresAlumnoComponent } from './profesores-alumno.component';

describe('ProfesoresAlumnoComponent', () => {
  let component: ProfesoresAlumnoComponent;
  let fixture: ComponentFixture<ProfesoresAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfesoresAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfesoresAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
