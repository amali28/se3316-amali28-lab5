import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveParkasComponent } from './retrieve-parkas.component';

describe('RetrieveParkasComponent', () => {
  let component: RetrieveParkasComponent;
  let fixture: ComponentFixture<RetrieveParkasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveParkasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveParkasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
