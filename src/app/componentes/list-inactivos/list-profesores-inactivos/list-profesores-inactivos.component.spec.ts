import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProfesoresInactivosComponent } from './list-profesores-inactivos.component';

describe('ListProfesoresInactivosComponent', () => {
  let component: ListProfesoresInactivosComponent;
  let fixture: ComponentFixture<ListProfesoresInactivosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListProfesoresInactivosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListProfesoresInactivosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
