import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEmpresaComponent } from './request-empresa.component';

describe('RequestEmpresaComponent', () => {
  let component: RequestEmpresaComponent;
  let fixture: ComponentFixture<RequestEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RequestEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
