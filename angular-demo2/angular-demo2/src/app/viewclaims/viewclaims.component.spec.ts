import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewclaimsComponent } from './viewclaims.component';

describe('ViewclaimsComponent', () => {
  let component: ViewclaimsComponent;
  let fixture: ComponentFixture<ViewclaimsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewclaimsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewclaimsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
