import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAluIndexComponent } from './admin-alu-index.component';

describe('AdminAluIndexComponent', () => {
  let component: AdminAluIndexComponent;
  let fixture: ComponentFixture<AdminAluIndexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAluIndexComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAluIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
