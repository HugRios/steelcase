import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoDosComponent } from './resultado-dos.component';

describe('ResultadoDosComponent', () => {
  let component: ResultadoDosComponent;
  let fixture: ComponentFixture<ResultadoDosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoDosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoDosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
