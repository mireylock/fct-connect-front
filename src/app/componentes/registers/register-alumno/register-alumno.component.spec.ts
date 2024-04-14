import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAlumnoComponent } from './register-alumno.component';

describe('RegisterAlumnoComponent', () => {
  let component: RegisterAlumnoComponent;
  let fixture: ComponentFixture<RegisterAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
