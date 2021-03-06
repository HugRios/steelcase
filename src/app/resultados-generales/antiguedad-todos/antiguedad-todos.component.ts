import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Parse: any;
declare var $: any;

var arrAntAmarillo = [];
var arrAntAzul = [];
var arrAntVerde = [];
var arrayAnt = [];
var idCliente;

@Component({
  selector: 'app-antiguedad-todos',
  templateUrl: './antiguedad-todos.component.html',
  styleUrls: ['./antiguedad-todos.component.css']
})
export class AntiguedadTodosComponent implements OnInit {

  tAm : any;
  tAz : any;
  tVe : any;
  Total: any;

  constructor(private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';
   }

   goBack() {
       window.history.back();
   }

  regresaHome(){
    this.router.navigate(['']);
  }

  getGET(){
    var loc = document.location.href;
    var getString = loc.substring(loc.lastIndexOf('-')+1);
    console.log(getString);
    var auxString = getString.replace(/%26/g, "&");
    var newString = auxString.replace(/%3D/g, "=");

    var GET = newString.split('&');
    var get = [];

    for (let i = 0; i < GET.length; i++) {
        var tmp = GET[i].split('=');
          get.push({nombre:tmp[0], number:tmp[1]})
    }
    return get;
  }

  getSumas(){
    var vector = this.getGET();
    this.tAm = vector[0].number;
    this.tAz = vector[1].number;
    this.tVe = vector[2].number;
    this.Total = ((parseFloat(this.tAm)+parseFloat(this.tAz)+parseFloat(this.tVe))/3).toFixed(1);
  }

  getId(){
    var url = window.location.pathname;
    var aux = url.indexOf("F");
    if(aux == 21){
      idCliente = '';
    }else{
      idCliente = url.substring(url.indexOf(':')+1, url.indexOf('-'));
    }
  }
  addAntiguedad(){
  var promise = new Parse.Promise();
  var Antiguedad = Parse.Object.extend("Antiguedad");
  var query = new Parse.Query(Antiguedad);
      query.find({
        success: function(res){
          for (var i = 0; i < res.length; i++) {
            arrayAnt.push({nombre: res[i].get("nombre"), id: res[i].id, orden: res[i].get('orden')});
              //$("#antigWell").append('<li id='+res[i].id+'>'+res[i].get("nombre")+'</li>');
          }
          promise.resolve(arrayAnt)
        }
      })
      return promise;
  }

  reporteAntAmarillo(){
    var Wellbeing = Parse.Object.extend('Wellbeing');
    var promise = new Parse.Promise();
      this.addAntiguedad().then((results: any) => {
        for (let i = 0; i < arrayAnt.length; i++) {
          var AntWell  = Parse.Object.extend('Antiguedad');
          var antiguedad = new AntWell();
              antiguedad.id = arrayAnt[i].id;
          var query  = new Parse.Query(Wellbeing);
          if(idCliente != ''){
            var Cliente = Parse.Object.extend('ClienteWell');
            var cliente = new Cliente();
                cliente.id = idCliente;
            query.equalTo('cliente', cliente);
          }
              query.equalTo("antiguedad", antiguedad);
              query.find({
                success: function(results){
                  if(results.length != 0){
                    var pTotal: number = 0;
                    var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
                      for (let i = 0; i < results.length; i++) {
                        var object = results[i];
                        //t+=object.get("physical");
                        t += object.get("postura");
                        //rt+=object.get("choice");
                        rt += object.get("movimiento");
                        //r+=object.get("posture");
                        r += object.get("temperatura");
                        //rb+=object.get("control");
                        rb += object.get("peso");
                        //b+=object.get("presence");
                        b += object.get("ergonomia");
                        lb += object.get("cargaTrabajo");//cambiar nueva encuesta carga de trabajo
                        //l+=object.get("privacy");
                        l += object.get("vitalidad");//cambiar nueva encuesta vitalidad
                        //lt+=object.get("cognitive");
                        lt += object.get("luz");

                        eb += object.get("contactoexterior");
                      }//termina for query

                      var fct = t / results.length;
                      var fcrt = rt / results.length;
                      var fcr = r / results.length;
                      var fcrb = rb / results.length;
                      var fcb = b / results.length;
                      var fclb = lb / results.length;
                      var fcl = l / results.length;
                      var fclt = lt / results.length;
                      var fceb = eb / results.length;
                      pTotal = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9);
                      arrAntAmarillo.push({nombre: arrayAnt[i].nombre,
                                          total: pTotal.toFixed(1), orden:arrayAnt[i].orden})
                  }else{
                    arrAntAmarillo.push({nombre: arrayAnt[i].nombre, total: 'NA', orden:arrayAnt[i].orden})
                  }
                  promise.resolve(arrAntAmarillo.sort(comparar))
                }
              })

        }
      })
        return promise;
  }

  reporteAntAzul(){
    var Wellbeing = Parse.Object.extend('WellCognitivo');
    var promise = new Parse.Promise();
    this.reporteAntAmarillo().then((results: any) =>{
      for (let i = 0; i < arrayAnt.length; i++) {
        var AntWell  = Parse.Object.extend('Antiguedad');
        var antiguedad = new AntWell();
            antiguedad.id = arrayAnt[i].id;
        var query  = new Parse.Query(Wellbeing);
        if(idCliente != ''){
          var Cliente = Parse.Object.extend('ClienteWell');
          var cliente = new Cliente();
              cliente.id = idCliente;
          query.equalTo('cliente', cliente);
        }
            query.equalTo("antiguedad", antiguedad);
            query.find({
              success: function(results){
                if(results.length != 0){
                  var pTotal: number = 0;
                  var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
                  for (let i = 0; i < results.length; i++) {
                    var object = results[i];
                    //t+=object.get("physical");
                    t += object.get("realizacion");//cambiar para nueva encuesta//realizacion
                    //rt+=object.get("choice");
                    rt += object.get("eleccion");//cambiar para nueva encuesta//eleccion
                    //r+=object.get("posture");
                    r += object.get("estres");
                    //rb+=object.get("control");
                    rb += object.get("anonEstrategico");
                    //b+=object.get("presence");
                    b += object.get("atencionPlena");//cambiar para nueva encuesta//atencion plena
                    lb += object.get("confidencialidad");//cambiar para nueva encuesta//confidencialidad
                    //l+=object.get("privacy");
                    l += object.get("bloqueEst");
                    //lt+=object.get("cognitive");
                    lt += object.get("revitalizacion");// cambiar por revitalizacion

                    eb += object.get("creatividad");//cambiar por creatividad
                  }//termina for query
                  var fct = t / results.length;
                  var fcrt = rt / results.length;
                  var fcr = r / results.length;
                  var fcrb = rb / results.length;
                  var fcb = b / results.length;
                  var fclb = lb / results.length;
                  var fcl = l / results.length;
                  var fclt = lt / results.length;
                  var fceb = eb / results.length;
                  pTotal = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9);
                  arrAntAzul.push({nombre: arrayAnt[i].nombre,
                                  total: pTotal.toFixed(1),orden:arrayAnt[i].orden})
                }else{
                  arrAntAzul.push({nombre: arrayAnt[i].nombre, total: 'NA',orden:arrayAnt[i].orden})
                }
                promise.resolve(arrAntAzul.sort(comparar))
              }
            })
      }//termina for primer arreglo
    })
    return promise;
  }

  reporteAntVerde(){
    var Wellbeing = Parse.Object.extend('WellEmocional');
    var promise = new Parse.Promise();
    this.reporteAntAzul().then((results: any) => {
      for (let i = 0; i < arrayAnt.length; i++) {
        var AntWell  = Parse.Object.extend('Antiguedad');
        var antiguedad = new AntWell();
            antiguedad.id = arrayAnt[i].id;
        var query  = new Parse.Query(Wellbeing);
        if(idCliente != ''){
          var Cliente = Parse.Object.extend('ClienteWell');
          var cliente = new Cliente();
              cliente.id = idCliente;
          query.equalTo('cliente', cliente);
        }
            query.equalTo("antiguedad", antiguedad);
            query.find({
              success: function(results){
                if(results.length != 0){
                  var pTotal: number = 0;
                  var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
                  for (let i = 0; i < results.length; i++) {
                    var object = results[i];
                    //t+=object.get("physical");
                    t += object.get("sentValorado"); // cambiar por sentValorado
                    //rt+=object.get("choice");
                    rt += object.get("conectarseOtros");
                    //r+=object.get("posture");
                    r += object.get("interaccionSocial");
                    //rb+=object.get("control");
                    rb += object.get("confianza");
                    //b+=object.get("presence");
                    b += object.get("sentido");//cambiar para encuestas por sentido
                    lb += object.get("optimismo");//cambair por optimismo
                    //l+=object.get("privacy");
                    l += object.get("autenticidad");//cambiar para encuestas por autenticidad
                    //lt+=object.get("cognitive");
                    lt += object.get("intLider");//cambiar para encuestas por intLider

                    eb += object.get("proposito");
                  }//termina for query
                  var fct = t / results.length;
                  var fcrt = rt / results.length;
                  var fcr = r / results.length;
                  var fcrb = rb / results.length;
                  var fcb = b / results.length;
                  var fclb = lb / results.length;
                  var fcl = l / results.length;
                  var fclt = lt / results.length;
                  var fceb = eb / results.length;
                  pTotal = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9);
                  arrAntVerde.push({nombre: arrayAnt[i].nombre,
                                    total: pTotal.toFixed(1), orden:arrayAnt[i].orden})
                }else{
                  arrAntVerde.push({nombre: arrayAnt[i].nombre, total: 'NA', orden:arrayAnt[i].orden})
                }
                  promise.resolve(arrAntVerde.sort(comparar))
              }
            })
      }//termina for primer arreglo
    })
    return promise;
  }


  getInfo(){
    this.reporteAntVerde().then((response: any) =>{
      setTimeout(function(){
        console.log(arrAntAmarillo);
        console.log(arrAntAzul);
        console.log(arrAntVerde);
        var totalAm = 0;
        var totalAz = 0;
        var totalV = 0;
        var k = 0;
        for (let i = 0; i < arrAntAmarillo.length; i++) {
          $("#pAm"+(i+1)).html(arrAntAmarillo[i].total);
          $("#tit"+(i+1)).html(arrAntAmarillo[i].nombre);
          if(arrAntAmarillo[i].total != 'NA'){
              totalAm += parseFloat(arrAntAmarillo[i].total);
              k++;
          }
        }


        for (let i = 0; i < arrAntAzul.length; i++) {
          $("#pAz"+(i+1)).html(arrAntAzul[i].total);
          if(arrAntAzul[i].total != 'NA'){
            totalAz += parseFloat(arrAntAzul[i].total);
          }
        }

        for (let i = 0; i < arrAntVerde.length; i++) {
          $("#pv"+(i+1)).html(arrAntVerde[i].total);
          if(arrAntVerde[i].total != 'NA'){
            totalV += parseFloat(arrAntVerde[i].total);
          }
        }

        var datosGraf = getTotales();
        for (let i = 0; i < datosGraf.length; i++) {
            $("#t"+(i+1)).html(datosGraf[i].toFixed(1));
        }

        $("#modalAlert").modal('hide');
      }, 5000);
    })
  }
  ngOnInit() {
    this.getSumas();
    this.getId();

    $("#modalAlert").modal('toggle');
   arrAntAmarillo.length = 0;
   arrAntAzul.length = 0;
   arrAntVerde.length = 0;
   arrayAnt.length = 0;
   this.getInfo();
  }

}

function comparar(a, b) {
  var x = a.orden;
var y = b.orden;
return x < y ? -1 : x > y ? 1 : 0;
}

function getTotales(){
  var datosGraf = [];
  for (let i = 0; i < arrAntAmarillo.length; i++) {
    var total = (parseFloat(arrAntAmarillo[i].total) + parseFloat(arrAntAzul[i].total) + parseFloat(arrAntVerde[i].total))/3;
    if( total.toString() == 'NaN'){
      total = 0;
      datosGraf.push(total)
    }else{
      datosGraf.push(total)
    }
  }
  return datosGraf;
}
