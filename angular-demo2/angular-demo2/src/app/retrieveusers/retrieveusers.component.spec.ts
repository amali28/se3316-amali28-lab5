import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveusersComponent } from './retrieveusers.component';

describe('RetrieveusersComponent', () => {
  let component: RetrieveusersComponent;
  let fixture: ComponentFixture<RetrieveusersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveusersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveusersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
