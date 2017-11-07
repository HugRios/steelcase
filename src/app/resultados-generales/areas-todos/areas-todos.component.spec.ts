import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AreasTodosComponent } from './areas-todos.component';

describe('AreasTodosComponent', () => {
  let component: AreasTodosComponent;
  let fixture: ComponentFixture<AreasTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AreasTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AreasTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
