import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolicitudIndexComponent } from './solicitud-index.component';

describe('SolicitudIndexComponent', () => {
  let component: SolicitudIndexComponent;
  let fixture: ComponentFixture<SolicitudIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SolicitudIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SolicitudIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
