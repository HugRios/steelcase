import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AntiguedadTodosComponent } from './antiguedad-todos.component';

describe('AntiguedadTodosComponent', () => {
  let component: AntiguedadTodosComponent;
  let fixture: ComponentFixture<AntiguedadTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AntiguedadTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AntiguedadTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
