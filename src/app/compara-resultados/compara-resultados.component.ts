import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compara-resultados',
  templateUrl: './compara-resultados.component.html',
  styleUrls: ['./compara-resultados.component.css']
})
export class ComparaResultadosComponent implements OnInit {

uno : boolean = false;
dos : boolean = false;
tres : boolean = false;
  constructor() {

   }

  cuentaResultados(){
    var url  = window.location.pathname;
    var aux  = url.substring(url.lastIndexOf('/')+2, url.length-1)
    var id = aux.substring(0, aux.indexOf('-'))
    var next  = aux.replace(/,/g, " ");
    var cadena = next
    var vecAux = cadena.split(" ");

    return vecAux;

  }

  muestraComponentes(){
    var noComponentes = this.cuentaResultados();
    debugger
    if(noComponentes.length == 1){
      this.uno=true
    }else if(noComponentes.length == 2){
      this.uno=true
      this.dos = true;
    }
  }





  ngOnInit() {
    this.muestraComponentes();
  }

}
