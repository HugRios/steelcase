import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MyDatePickerModule } from 'mydatepicker';

import { AppComponent } from './app.component';
import { ResultadosGeneralesComponent } from '../app/resultados-generales/resultados-generales.component';
import { ComparaResultadosComponent } from './compara-resultados/compara-resultados.component';
import { ResultadoUnoComponent } from '../app/compara-resultados/resultado-uno/resultado-uno.component';
import { ResultadoDosComponent } from '../app/compara-resultados/resultado-dos/resultado-dos.component';
import { InicioComponent } from './inicio/inicio.component';
import { CircleYellowComponent } from './circle-yellow/circle-yellow.component';
import { ResultadosFiltrosComponent } from './resultados-generales/resultados-filtros/resultados-filtros.component';
import { ResultadosEmpresaComponent } from './resultados-generales/resultados-empresa/resultados-empresa.component';
import { ResultadoTresComponent } from '../app/compara-resultados/resultado-tres/resultado-tres.component';
import { Servicios } from './services/service';
import { AntiguedadTodosComponent } from './resultados-generales/antiguedad-todos/antiguedad-todos.component';
import { GeneracionTodosComponent } from './resultados-generales/generacion-todos/generacion-todos.component';


@NgModule({
  declarations: [
    AppComponent,
    ResultadosGeneralesComponent,
    ComparaResultadosComponent,
    ResultadoUnoComponent,
    ResultadoDosComponent,
    InicioComponent,
    CircleYellowComponent,
    ResultadosFiltrosComponent,
    ResultadosEmpresaComponent,
    ResultadoTresComponent,
    AntiguedadTodosComponent,
    GeneracionTodosComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MyDatePickerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: '',
        component: ResultadosGeneralesComponent
      },
      {
        path: 'resultados/:id',
        component: ComparaResultadosComponent
      },
      {
        path: 'inicio/:id',
        component: InicioComponent
      },
      {
        path: 'physical/:id',
        component: CircleYellowComponent
      }
      ,
      {
        path: 'resultadosFiltro/:id',
        component: ResultadosFiltrosComponent
      },{
        path: 'resultadosEmpresa',
        component: ResultadosEmpresaComponent
      },
      {
        path: 'generalGeneracion',
        component: GeneracionTodosComponent
      },
      {
        path: 'generalAntiguedad',
        component: AntiguedadTodosComponent
      }
    ])
  ],
  providers: [Servicios],
  bootstrap: [AppComponent]
})

export class AppModule { }
