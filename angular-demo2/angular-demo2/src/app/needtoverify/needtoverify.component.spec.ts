import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NeedtoverifyComponent } from './needtoverify.component';

describe('NeedtoverifyComponent', () => {
  let component: NeedtoverifyComponent;
  let fixture: ComponentFixture<NeedtoverifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NeedtoverifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NeedtoverifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
