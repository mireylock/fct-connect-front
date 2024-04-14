import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterEmpresaComponent } from './register-empresa.component';

describe('RegisterEmpresaComponent', () => {
  let component: RegisterEmpresaComponent;
  let fixture: ComponentFixture<RegisterEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegisterEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
