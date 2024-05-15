import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAlumnoComponent } from './index-alumno.component';

describe('IndexAlumnoComponent', () => {
  let component: IndexAlumnoComponent;
  let fixture: ComponentFixture<IndexAlumnoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexAlumnoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
