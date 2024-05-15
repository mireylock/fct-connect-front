import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTotalAlumnosComponent } from './list-total-alumnos.component';

describe('ListTotalAlumnosComponent', () => {
  let component: ListTotalAlumnosComponent;
  let fixture: ComponentFixture<ListTotalAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTotalAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTotalAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
