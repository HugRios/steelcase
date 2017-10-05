import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CircleYellowComponent } from './circle-yellow.component';

describe('CircleYellowComponent', () => {
  let component: CircleYellowComponent;
  let fixture: ComponentFixture<CircleYellowComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CircleYellowComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CircleYellowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
