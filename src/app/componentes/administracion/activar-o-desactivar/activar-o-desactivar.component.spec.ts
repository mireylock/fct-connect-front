import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivarODesactivarComponent } from './activar-o-desactivar.component';

describe('ActivarODesactivarComponent', () => {
  let component: ActivarODesactivarComponent;
  let fixture: ComponentFixture<ActivarODesactivarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivarODesactivarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivarODesactivarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
