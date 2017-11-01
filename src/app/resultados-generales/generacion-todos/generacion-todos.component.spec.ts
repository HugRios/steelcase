import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneracionTodosComponent } from './generacion-todos.component';

describe('GeneracionTodosComponent', () => {
  let component: GeneracionTodosComponent;
  let fixture: ComponentFixture<GeneracionTodosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneracionTodosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneracionTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
