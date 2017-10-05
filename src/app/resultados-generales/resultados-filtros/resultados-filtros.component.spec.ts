import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosFiltrosComponent } from './resultados-filtros.component';

describe('ResultadosFiltrosComponent', () => {
  let component: ResultadosFiltrosComponent;
  let fixture: ComponentFixture<ResultadosFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
