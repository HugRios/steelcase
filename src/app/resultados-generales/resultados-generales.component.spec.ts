import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosGeneralesComponent } from './resultados-generales.component';

describe('ResultadosGeneralesComponent', () => {
  let component: ResultadosGeneralesComponent;
  let fixture: ComponentFixture<ResultadosGeneralesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosGeneralesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosGeneralesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
