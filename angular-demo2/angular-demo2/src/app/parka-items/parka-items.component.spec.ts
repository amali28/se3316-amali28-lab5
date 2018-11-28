import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkaItemsComponent } from './parka-items.component';

describe('ParkaItemsComponent', () => {
  let component: ParkaItemsComponent;
  let fixture: ComponentFixture<ParkaItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParkaItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParkaItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
