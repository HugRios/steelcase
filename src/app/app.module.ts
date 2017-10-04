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



@NgModule({
  declarations: [
    AppComponent,
    ResultadosGeneralesComponent,
    ComparaResultadosComponent,
    ResultadoUnoComponent,
    ResultadoDosComponent,
    InicioComponent,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    MyDatePickerModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        component: ResultadosGeneralesComponent
      },
      {
        path: 'resultados/:id',
        component: ComparaResultadosComponent
      },
      {
        path: 'inicio/:id',
        component: InicioComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
