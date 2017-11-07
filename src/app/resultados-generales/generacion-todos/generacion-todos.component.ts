import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Parse: any;
declare var $: any;
var arrayGeneracion = [];
var arrGenAmarillo = [];
var arrGenAzul = [];
var arrGenVerde = [];
var idCliente;


@Component({
  selector: 'app-generacion-todos',
  templateUrl: './generacion-todos.component.html',
  styleUrls: ['./generacion-todos.component.css']
})
export class GeneracionTodosComponent implements OnInit {

nameG1 = '';
nameG2='';
nameG3 = '';
nameG4 = '';
nameG5 = '';
tAm : any;
tAz : any;
tVe : any;
Total: any;

  constructor(private router: Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';
   }

   goBack() {
       window.history.back();
   }

  regresaHome(){
    this.router.navigate([''])
  }

  getGET(){
    var loc = document.location.href;
    var getString = loc.substring(loc.lastIndexOf('-')+1);
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
    console.log(aux);
    if(aux == 21){
      idCliente = '';
    }else{

      idCliente = url.substring(url.indexOf(':')+1,url.indexOf('F'));

    }

  }

  addGeneracion(){
    var promise = new Parse.Promise();
    var Generacion = Parse.Object.extend("genWell");
    var query = new Parse.Query(Generacion);
        query.find({
          success: function(res){
            for (var i = 0; i < res.length; i++) {
              arrayGeneracion.push({nombre:res[i].get("Nombre"), id: res[i].id, orden: res[i].get("orden")})
                //$("#genWell").append('<li id='+res[i].id+'>'+res[i].get("Nombre")+'</li>');
            }
            promise.resolve(arrayGeneracion);
          }
        })
return promise;
  }

  reporteGeneracion(){
    var Wellbeing = Parse.Object.extend('Wellbeing');
    var promise = new Parse.Promise();
    this.addGeneracion().then((response: any)=>{
      for (let i = 0; i < response.length; i++) {
        var GenWell  = Parse.Object.extend('genWell');
        var generacion = new GenWell();
            generacion.id = response[i].id;
        var query  = new Parse.Query(Wellbeing);
        if(idCliente != ''){
          var Cliente = Parse.Object.extend('ClienteWell');
          var cliente = new Cliente();
              cliente.id = idCliente;
          query.equalTo('cliente', cliente);
        }
            query.equalTo("generacion", generacion);
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
                    arrGenAmarillo.push({nombre: response[i].nombre,
                                        total: pTotal.toFixed(1),
                                        orden: response[i].orden})
                }else{
                  arrGenAmarillo.push({nombre: response[i].nombre, total: 'NA',orden: response[i].orden})
                }
                  promise.resolve(arrGenAmarillo.sort(comparar))
              }
            })

      }//termina for array Generaciones
    })

      return promise;

    }

  reporteGenAzul(){
        var Wellbeing = Parse.Object.extend('WellCognitivo');
        var promise = new Parse.Promise();
      this.reporteGeneracion().then((result: any) =>{
          for (let i = 0; i < arrayGeneracion.length; i++) {
            var GenWell  = Parse.Object.extend('genWell');
            var generacion = new GenWell();
                generacion.id = arrayGeneracion[i].id;
            var query  = new Parse.Query(Wellbeing);
            if(idCliente != ''){
              var Cliente = Parse.Object.extend('ClienteWell');
              var cliente = new Cliente();
                  cliente.id = idCliente;
              query.equalTo('cliente', cliente);
            }
                query.equalTo("generacion", generacion);
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
                      arrGenAzul.push({nombre: arrayGeneracion[i].nombre,
                                      total: pTotal.toFixed(1), orden: arrayGeneracion[i].orden})
                    }else{
                      arrGenAzul.push({nombre: arrayGeneracion[i].nombre, total: 'NA', orden: arrayGeneracion[i].orden})
                    }
                    promise.resolve(arrGenAzul.sort(comparar))
                  }
                })
          }//termina for primer arreglo
      })
      return promise;
    }

  reporteGenVerde(){
    console.log('verde');
    var Wellbeing = Parse.Object.extend('WellEmocional');
    var promise = new Parse.Promise();
    this.reporteGenAzul().then((results: any) =>{
      for (let i = 0; i < arrayGeneracion.length; i++) {
        var GenWell  = Parse.Object.extend('genWell');
        var generacion = new GenWell();
            generacion.id = arrayGeneracion[i].id;
        var query  = new Parse.Query(Wellbeing);
        if(idCliente != ''){
          var Cliente = Parse.Object.extend('ClienteWell');
          var cliente = new Cliente();
              cliente.id = idCliente;
          query.equalTo('cliente', cliente);
        }
            query.equalTo("generacion", generacion);
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
                  arrGenVerde.push({nombre: arrayGeneracion[i].nombre,
                                    total: pTotal.toFixed(1), orden: arrayGeneracion[i].orden})
                }else{
                  arrGenVerde.push({nombre: arrayGeneracion[i].nombre, total: 'NA', orden: arrayGeneracion[i].orden})
                }
                  promise.resolve(arrGenVerde.sort(comparar))
              }
            })
      }//termina for primer arreglo
    })
    return promise;
  }

  getGenInfo(){
    this.reporteGenVerde().then((response: any) =>{
      setTimeout(function(){
        var totalAm = 0;
        var totalAz = 0;
        var totalV = 0;
        var k = 0;
        for (let i = 0; i < arrGenAmarillo.length; i++) {
          $("#pAm"+(i+1)).html(arrGenAmarillo[i].total);
          $("#tit"+(i+1)).html(arrGenAmarillo[i].nombre);
          if(arrGenAmarillo[i].total != 'NA'){
              totalAm += parseFloat(arrGenAmarillo[i].total);
              k++;
          }
        }


        for (let i = 0; i < arrGenAzul.length; i++) {
          $("#pAz"+(i+1)).html(arrGenAzul[i].total);
          if(arrGenAzul[i].total != 'NA'){
            totalAz += parseFloat(arrGenAzul[i].total);
          }
        }

        for (let i = 0; i < arrGenVerde.length; i++) {
          $("#pv"+(i+1)).html(arrGenVerde[i].total);
          if(arrGenVerde[i].total != 'NA'){
            totalV += parseFloat(arrGenVerde[i].total);
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
    this.getId();
    this.getSumas();
    arrayGeneracion.length = 0;
    arrGenVerde.length = 0;
    arrGenAmarillo.length = 0;
    arrGenAzul.length = 0;
    $("#modalAlert").modal('toggle');
    this.getGenInfo();
  }

}

function comparar(a, b) {
  var x = a.orden;
var y = b.orden;
return x < y ? -1 : x > y ? 1 : 0;
}

function getTotales(){
  var datosGraf = [];
  for (let i = 0; i < arrGenAmarillo.length; i++) {
    var total = (parseFloat(arrGenAmarillo[i].total) + parseFloat(arrGenAzul[i].total) + parseFloat(arrGenVerde[i].total))/3;
    if( total.toString() == 'NaN'){
      total = 0;
      datosGraf.push(total)
    }else{
      datosGraf.push(total)
    }
  }
  return datosGraf;
}

function crearDatas(cb1){
  console.log(arrGenAmarillo);
  console.log(arrGenAzul);
  console.log(arrGenVerde);
  crearDatasDone('Done')
}

function crearDatasDone(msg){
  for (let i = 0; i < arrGenAmarillo.length; i++) {
    $("#pAm"+(i+1)).html(arrGenAmarillo[i].total);
      console.log(arrGenAmarillo[i]);
  }
  crearDatasAzul(crearDatasAzulDone);
}

function crearDatasAzul(cb2){
  for (let i = 0; i < arrGenAzul.length; i++) {
    $("#pAz"+(i+1)).html(arrGenAzul[i].total);
      console.log(arrGenAzul[i]);
  }
  cb2('AzulDone')
}

function crearDatasAzulDone(msgA){

  console.log(msgA)
}
