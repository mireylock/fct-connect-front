import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTotalEmpresasComponent } from './list-total-empresas.component';

describe('ListTotalEmpresasComponent', () => {
  let component: ListTotalEmpresasComponent;
  let fixture: ComponentFixture<ListTotalEmpresasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTotalEmpresasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTotalEmpresasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
