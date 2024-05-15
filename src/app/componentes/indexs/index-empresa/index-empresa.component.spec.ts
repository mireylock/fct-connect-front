import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexEmpresaComponent } from './index-empresa.component';

describe('IndexEmpresaComponent', () => {
  let component: IndexEmpresaComponent;
  let fixture: ComponentFixture<IndexEmpresaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexEmpresaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
