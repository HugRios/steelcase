import { Component, OnInit } from '@angular/core';
declare var Parse: any;
declare var $: any;

var arrayAreas = [];
var arrayAreasWell = [];
var arrAreaAmarillo = [];
var arrAreaAzul = [];
var arrAreaVerde = [];

@Component({
  selector: 'app-areas-todos',
  templateUrl: './areas-todos.component.html',
  styleUrls: ['./areas-todos.component.css']
})
export class AreasTodosComponent implements OnInit {

columnaUno = false;
dos: boolean = false;
tres: boolean = false;
tAm : any;
tAz : any;
tVe : any;
Total: any;
  constructor() {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';
    arrAreaAmarillo.length = 0;
    arrAreaAzul.length = 0;
    arrAreaVerde.length = 0;
  }

  areasCliente(){
    arrayAreasWell.length = 0;
    var url = window.location.pathname;
    var ide = url.substring(url.indexOf(":")+1, url.indexOf('-'))
    var promise = new Parse.Promise();
    var Cliente = Parse.Object.extend("ClienteWell");
    var cliente = new Cliente();
        cliente.id = ide;
    var queryArea = new Parse.Query("areaWell");
        queryArea.equalTo('cliente', cliente);
        queryArea.find({
          success: function(resAreas){
            for (let i = 0; i < resAreas.length; i++) {
              arrayAreasWell.push({nombre:resAreas[i].get("Name"), id: resAreas[i].id})
            }
            var queryCliente = new Parse.Query("LinksWell");
                queryCliente.equalTo("cliente", cliente);
                queryCliente.find({
                  success: function(resArC){
                      var array = resArC[0].get('areas');
                      for (let i = 0; i < array.length; i++) {
                        arrayAreasWell.push({nombre:array[i].nombre, id: array[i].id})
                      }
                      promise.resolve(arrayAreasWell);
                  }
                })
          }
        })
        return promise;
  }


  reporteAreaAmarillo(){
    var Wellbeing = Parse.Object.extend('Wellbeing');
    var promise = new Parse.Promise();
    this.areasCliente().then((response:any) =>{
      for (let i = 0; i < arrayAreasWell.length; i++) {
        var AreaWell  = Parse.Object.extend('areaWell');
        var area = new AreaWell();
            area.id = arrayAreasWell[i].id;
        var query  = new Parse.Query(Wellbeing);
            query.equalTo("area", area);
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
                    arrAreaAmarillo.push({nombre: arrayAreasWell[i].nombre,
                                        total: pTotal.toFixed(1)})
                }else{
                  arrAreaAmarillo.push({nombre: arrayAreasWell[i].nombre, total: 'NA'})
                }
                promise.resolve(arrAreaAmarillo.sort(compararNombre))
              }
            })

      }
    })
        return promise;
  }

  reporteAreaAzul(){
    var Wellbeing = Parse.Object.extend('WellCognitivo');
    var promise = new Parse.Promise();
    this.reporteAreaAmarillo().then((results: any) =>{
      for (let i = 0; i < arrayAreasWell.length; i++) {
        var AreaWell  = Parse.Object.extend('areaWell');
        var area = new AreaWell();
            area.id = arrayAreasWell[i].id;
        var query  = new Parse.Query(Wellbeing);
            query.equalTo("area", area);
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
                  arrAreaAzul.push({nombre: arrayAreasWell[i].nombre,
                                  total: pTotal.toFixed(1)})
                }else{
                  arrAreaAzul.push({nombre: arrayAreasWell[i].nombre, total: 'NA'})
                }
                promise.resolve(arrAreaAzul.sort(compararNombre))
              }
            })
      }//termina for primer arreglo
    })
    return promise;
  }

  reporteAreaVerde(){
    var Wellbeing = Parse.Object.extend('WellEmocional');
    var promise = new Parse.Promise();
    this.reporteAreaAzul().then((results: any) => {
      for (let i = 0; i < arrayAreasWell.length; i++) {
        var AreaWell  = Parse.Object.extend('areaWell');
        var area = new AreaWell();
            area.id = arrayAreasWell[i].id;
        var query  = new Parse.Query(Wellbeing);
            query.equalTo("area", area);
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
                  arrAreaVerde.push({nombre: arrayAreasWell[i].nombre,
                                    total: pTotal.toFixed(1)})
                }else{
                  arrAreaVerde.push({nombre: arrayAreasWell[i].nombre, total: 'NA'})
                }
                  promise.resolve(arrAreaVerde.sort(compararNombre))
              }
            })
      }//termina for primer arreglo
    })
    return promise;
  }

  getAreas(){
    this.reporteAreaVerde().then((response:any) => {
      setTimeout(function(){
        var totalAm = 0;
        var totalAz = 0;
        var totalV = 0;
        var k = 0;
        console.log(arrAreaAmarillo.length);
        if(arrAreaAmarillo.length <= 5 ){
          $("#columnaUno").show()
        }else if(arrAreaAmarillo.length <= 10){
          $("#columnaUno").show()
          $("#columnaDos").show()
        }
        for (let i = 0; i < arrAreaAmarillo.length; i++) {
          $("#prom"+(i+1)).show('fast')
          $("#col"+(i+1)).show('fast');
          $("#pAm"+(i+1)).html(arrAreaAmarillo[i].total);
          $("#tit"+(i+1)).html(arrAreaAmarillo[i].nombre);
          if(arrAreaAmarillo[i].total != 'NA'){
              totalAm += parseFloat(arrAreaAmarillo[i].total);
              k++;
          }
        }


        for (let i = 0; i < arrAreaAzul.length; i++) {
          $("#pAz"+(i+1)).html(arrAreaAzul[i].total);
          if(arrAreaAzul[i].total != 'NA'){
            totalAz += parseFloat(arrAreaAzul[i].total);
          }
        }

        for (let i = 0; i < arrAreaVerde.length; i++) {
          $("#pv"+(i+1)).html(arrAreaVerde[i].total);
          if(arrAreaVerde[i].total != 'NA'){
            totalV += parseFloat(arrAreaVerde[i].total);
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

  goBack() {
      window.history.back();
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

  ngOnInit() {
    arrAreaAmarillo.length = 0;
    arrAreaAzul.length = 0;
    arrAreaVerde.length = 0;
    $("#modalAlert").modal('toggle');
    this.getSumas();
    this.getAreas();
  }

}

function compararNombre(a, b) {
  var x = a.nombre;
  var y = b.nombre;
return x < y ? -1 : x > y ? 1 : 0;
}

function getTotales(){
  var datosGraf = [];
  for (let i = 0; i < arrAreaAmarillo.length; i++) {
    var total = (parseFloat(arrAreaAmarillo[i].total) + parseFloat(arrAreaAzul[i].total) + parseFloat(arrAreaVerde[i].total))/3;
    if( total.toString() == 'NaN'){
      total = 0;
      datosGraf.push(total)
    }else{
      datosGraf.push(total)
    }
  }
  return datosGraf;
}
