import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTotalProfesoresComponent } from './list-total-profesores.component';

describe('ListTotalProfesoresComponent', () => {
  let component: ListTotalProfesoresComponent;
  let fixture: ComponentFixture<ListTotalProfesoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTotalProfesoresComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTotalProfesoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
