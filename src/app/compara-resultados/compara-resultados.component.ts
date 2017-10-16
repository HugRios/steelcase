import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-compara-resultados',
  templateUrl: './compara-resultados.component.html',
  styleUrls: ['./compara-resultados.component.css']
})
export class ComparaResultadosComponent implements OnInit {

empresa: boolean = false;
uno : boolean = false;
dos : boolean = false;
tres : boolean = false;
clase: any;
  constructor() {

   }

  cuentaResultados(){
    var url  = window.location.pathname;
    console.log(url)
    var aux  = url.substring(url.lastIndexOf('/')+2, url.length-1)
    var id = aux.substring(0, aux.indexOf('-'))
    var next  = aux.replace(/,/g, " ");
    var cadena = next
    var vecAux = cadena.split(" ");

    return vecAux;

  }
//retrasar aparicion 2do
  muestraComponentes(){
    var noComponentes = this.cuentaResultados();
    console.log(noComponentes.length);
    if(noComponentes.length == 1){
      this.empresa=true
    }else if(noComponentes.length == 2){
      this.clase = "col-md col-md-6"
      this.uno=true
      this.dos = true;
    }
  }






  ngOnInit() {
    this.muestraComponentes();
  }

}
