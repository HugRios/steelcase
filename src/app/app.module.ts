import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ResultadosGeneralesComponent } from '../app/resultados-generales/resultados-generales.component';
import { ComparaResultadosComponent } from './compara-resultados/compara-resultados.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultadosGeneralesComponent,
    ComparaResultadosComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      {
        path: 'home',
        component: ResultadosGeneralesComponent
      },
      {
        path: 'resultados/:id',
        component: ComparaResultadosComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
