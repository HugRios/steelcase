import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadosEmpresaComponent } from './resultados-empresa.component';

describe('ResultadosEmpresaComponent', () => {
  let component: ResultadosEmpresaComponent;
  let fixture: ComponentFixture<ResultadosEmpresaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadosEmpresaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadosEmpresaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
