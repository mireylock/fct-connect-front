import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAlumnoComponent } from './header-alumno.component';

describe('HeaderAlumnoComponent', () => {
  let component: HeaderAlumnoComponent;
  let fixture: ComponentFixture<HeaderAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
