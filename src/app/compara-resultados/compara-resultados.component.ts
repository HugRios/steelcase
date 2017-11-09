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
aviso1: boolean = false;
aviso2: boolean = false;
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

  getGET(){
    var loc = window.location.pathname;
    var getString = loc.substring(loc.lastIndexOf(':')+1);
    console.log(getString);
    var auxString = getString.replace(/%26/g, "&");
    var newString = auxString.replace(/%3D/g, "=");

    var GET = newString.split('&');
    var get = [];

    for (let i = 0; i < GET.length; i++) {
        var tmp = GET[i].split('=');
          get.push({nombre:tmp[0], id:tmp[1]})
    }
    return get;
  }


//retrasar aparicion 2do
  muestraComponentes(){
    var vec = this.getGET();
    console.log(vec);
    if(vec[0].id != '' && vec[1].id == ''){
      this.empresa=true
    }else if(vec[0].id != '' && vec[1].id != '' && vec[2].id==''){
      this.clase = "col-md col-md-6"
      this.uno=true
      this.dos = true;
    }else if(vec[0].id != '' && vec[1].id != '' && vec[2].id !=''){
      this.clase = "col-md col-md-4"
      this.uno=true
      this.dos = true;
      this.tres = true;
    }
  }


showAviso(event): void{
  this.aviso1 = event;
}

showAviso2(event): void{
  this.aviso2 = event;
}


  ngOnInit() {
    this.muestraComponentes();
  }

}
