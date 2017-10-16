import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultadoTresComponent } from './resultado-tres.component';

describe('ResultadoTresComponent', () => {
  let component: ResultadoTresComponent;
  let fixture: ComponentFixture<ResultadoTresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultadoTresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultadoTresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
