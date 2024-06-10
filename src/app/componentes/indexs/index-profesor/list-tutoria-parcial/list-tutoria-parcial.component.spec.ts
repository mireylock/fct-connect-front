import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTutoriaParcialComponent } from './list-tutoria-parcial.component';

describe('ListTutoriaParcialComponent', () => {
  let component: ListTutoriaParcialComponent;
  let fixture: ComponentFixture<ListTutoriaParcialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTutoriaParcialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ListTutoriaParcialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
