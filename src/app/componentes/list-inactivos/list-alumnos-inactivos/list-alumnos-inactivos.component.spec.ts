import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListAlumnosInactivosComponent } from './list-alumnos-inactivos.component';

describe('ListAlumnosInactivosComponent', () => {
  let component: ListAlumnosInactivosComponent;
  let fixture: ComponentFixture<ListAlumnosInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListAlumnosInactivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListAlumnosInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
