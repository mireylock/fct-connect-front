import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubidaArchivoComponent } from './subida-archivo.component';

describe('SubidaArchivoComponent', () => {
  let component: SubidaArchivoComponent;
  let fixture: ComponentFixture<SubidaArchivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubidaArchivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubidaArchivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
