import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { ResultadosGeneralesComponent } from '../app/resultados-generales/resultados-generales.component';

@NgModule({
  declarations: [
    AppComponent,
    ResultadosGeneralesComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      {
        path: 'ResultadosGenerales',
        component: ResultadosGeneralesComponent
      }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
