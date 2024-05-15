import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParcialAlumnosComponent } from './list-parcial-alumnos.component';

describe('ListParcialAlumnosComponent', () => {
  let component: ListParcialAlumnosComponent;
  let fixture: ComponentFixture<ListParcialAlumnosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListParcialAlumnosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListParcialAlumnosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
