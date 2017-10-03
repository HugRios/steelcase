import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparaResultadosComponent } from './compara-resultados.component';

describe('ComparaResultadosComponent', () => {
  let component: ComparaResultadosComponent;
  let fixture: ComponentFixture<ComparaResultadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComparaResultadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparaResultadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
