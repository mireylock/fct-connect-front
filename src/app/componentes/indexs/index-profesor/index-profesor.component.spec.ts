import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexProfesorComponent } from './index-profesor.component';

describe('IndexProfesorComponent', () => {
  let component: IndexProfesorComponent;
  let fixture: ComponentFixture<IndexProfesorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndexProfesorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndexProfesorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
