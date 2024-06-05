import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTecnologiaComponent } from './add-tecnologia.component';

describe('AddTecnologiaComponent', () => {
  let component: AddTecnologiaComponent;
  let fixture: ComponentFixture<AddTecnologiaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTecnologiaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddTecnologiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
