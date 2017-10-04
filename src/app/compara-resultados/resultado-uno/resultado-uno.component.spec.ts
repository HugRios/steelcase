import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoUnoComponent } from './resultado-uno.component';

describe('ResultadoUnoComponent', () => {
  let component: ResultadoUnoComponent;
  let fixture: ComponentFixture<ResultadoUnoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoUnoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoUnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
