import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as html2canvas from "html2canvas"
declare var Canvas2Image : any;
declare var require : any;
declare var Parse: any;
declare var $: any;
declare var PptxGenJS : any;
import Chart from 'chart.js';
var general = 0;
var totalEncuestas = 0;

var arrayGeneracion = [];
var arrayClientes = [];
var arrayAreas = [];
var arrayAnt = [];
var arrGenAmarillo = [];
var arrGenAzul = [];
var arrGenVerde = [];
var arrIndAmarillo = [];
var arrIndAzul = [];
var arrIndVerde = [];
var arrAreaAmarillo = [];
var arrAreaAzul = [];
var arrAreaVerde = [];
var arrAntAmarillo = [];
var arrAntAzul = [];
var arrAntVerde = [];
var arrayIndustrias = [];
var arrayAreasWell = [];
var clienteEncuesta;
var nombreCliente;
var arrInfoImg = [];
var arrayEstadisticas = [];
var areasCliente = []
var statusFinal;
var pobTotal;
var numRespuestas;
var totalGral;

var amarillo = 0, azul= 0, verde = 0;

@Component({
  selector: 'app-resultados-filtros',
  templateUrl: './resultados-filtros.component.html',
  styleUrls: ['./resultados-filtros.component.css']
})
export class ResultadosFiltrosComponent implements OnInit {

  filtros : boolean = true;

  constructor(private router: Router){
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';
    totalEncuestas = 0;
    nombreCliente = '';
    arrayEstadisticas.length = 0;
  }

goBack() {
    window.history.back();
}

  regresaInd(){
    var array = this.getGET();
    if(array[4].id != ""){
      var query = new Parse.Query("indWell");
          query.equalTo("objectId", array[4].id)
          query.find({
            success: function(res){
              $("#showInd").show('fast');
              $("#industriaName").val(res[0].get('Nombre'))
            }
          })
    }
  }

  muestraBoton(){
    var array = this.getGET();
    if(array[0].id != '' && array[1].id == '' && array[2].id == '' && array[3].id == '' && array[4].id == ''){
      var query = new Parse.Query('ClienteWell');
          query.equalTo('objectId', array[0].id);
          query.find({
            success: function(res){
              var nombre = res[0].get('nombre')
              $("#tipo").html("BIENESTAR "+ nombre.toUpperCase());
            }
          })
      $("#btnReporte").show();
    }
  }

  getGET(){
      var loc = document.location.href;
      var getString = loc.substring(loc.lastIndexOf(":")+1);
      var auxString = getString.replace(/%26/g, "&");
      var newString = auxString.replace(/%3D/g, "=");
  //console.log(newString);
      var GET = newString.split('&');
      var get =[] ;//this object will be filled with the key-value pairs and returned.

      for(var i = 0, l = GET.length; i < l; i++){
         var tmp = GET[i].split('=');

           get.push({nombre:tmp[0], id: tmp[1]});

      }
      return get;
   }


   circuloAmarillo(): any{
     var vector = this.getGET();
     var promise = new Parse.Promise();
     var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
     var pTotal: number = 0;

     var query = new Parse.Query("Wellbeing");

     if(vector[0].id == ""){
       query.exists("cliente")
     }else{
       var id = vector[0].id ;
       var Cliente = Parse.Object.extend("ClienteWell");
       var cliente = new Cliente();
           cliente.id = id;
           var queryCliente = new Parse.Query(Cliente);
                queryCliente.equalTo("objectId", id);
                queryCliente.find({
                  success: function(res){
                    nombreCliente = res[0].get("nombre");
                    $("#showClient").show('fast');
                       $("#clienteName").val(nombreCliente);
                  }
                })
       //$("#empresaPP").html('hjdhfdf')
       query.equalTo("cliente", cliente);
     }

     if(vector[1].id == ""){
       query.exists("area")
     }else{
       var id = vector[1].id ;
       var area = Parse.Object.extend("areaWell");
       var area = new area();
           area.id = id;

           var queryArea = new Parse.Query(area);
                queryArea.equalTo("objectId", id);
                queryArea.find({
                  success: function(res){
                      $("#showArea").show('fast');
                       $("#areaName").val(res[0].get("Name"));
                  }
                })
       query.equalTo("area", area);
     }

     if(vector[2].id == ""){
       query.exists("generacion")
     }else{
       var id = vector[2].id ;
       var Generacion = Parse.Object.extend("genWell");
       var generacion = new Generacion();
           generacion.id = id;

           var queryGen = new Parse.Query(Generacion);
                queryGen.equalTo("objectId", id);
                queryGen.find({
                  success: function(res){
                      $("#showGen").show('fast');
                       $("#genName").val(res[0].get("Nombre"));
                  }
                })

       query.equalTo("generacion", generacion);
     }

     if(vector[3].id == ""){

       query.exists("antiguedad")
     }else{
       var id = vector[3].id ;
       var Antiguedad = Parse.Object.extend("Antiguedad");
       var antiguedad = new Antiguedad();
           antiguedad.id = id;

           var queryaAntiguedad = new Parse.Query(Antiguedad);
                queryaAntiguedad.equalTo("objectId", id);
                queryaAntiguedad.find({
                  success: function(res){
                    $("#showAntig").show('fast')
                       $("#antigName").val(res[0].get("nombre"));
                  }
                })
       query.equalTo("antiguedad", antiguedad);
     }



        query.find({
          success: function(results) {
            var totalA = results.length;
            for (var i = 0; i < results.length; i++) {
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
            }

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
            fct = (t / results.length);
            fcrt = (rt / results.length);
            fcr = (r / results.length);
            fcrb = (rb / results.length);
            fcb = (b / results.length);
            fclb = (lb / results.length);
            fcl = (l / results.length);
            fclt = (lt / results.length);
            fceb = (eb / results.length);


            var ctx = document.getElementById("myChartYellow");
            var myChart = new Chart(ctx, {
              type: 'radar',
              data: {
                labels: [".", ".", ".", ".", ".", ".", ".", ".", "."],
                datasets: [{
                  backgroundColor: "rgba(253, 99, 68, 0.81)",
                  borderColor: "rgba(253, 86, 53, 1)",
                  data: [fct, fcrt, fcr, fcrb, fcb, fclb, fcl, fclt, fceb]
                }]
              },
              options: {
               legend: { display: false },
               scale: {
               ticks: {
                   beginAtZero: true,
                   max: 5
               }
           }
              }
            });

            var number = pTotal;
            general += number;
            amarillo = pTotal;


            if (pTotal.toFixed(1) == 'NaN') {
              $("#promedioTotal").html('NA');
            } else {
              $("#promedioTotal").html(pTotal.toFixed(1));
            }

            promise.resolve(number);

            /*  if (pTotal == 'NaN'){
               $("#promedioTotal").html(0);
              }else{
                $("#promedioTotal").html(pTotal);

              }*/
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        })
        return promise;
   }

   circuloAzul(): any {
     var promise = new Parse.Promise();
      var vector = this.getGET();
     this.circuloAmarillo().then((response: any) => {
       var Evaluacion = Parse.Object.extend("WellCognitivo");
       var query = new Parse.Query(Evaluacion);

       if(vector[0].id == ""){
         query.exists("cliente")
       }else{
         var id = vector[0].id ;
         var Cliente = Parse.Object.extend("ClienteWell");
         var cliente = new Cliente();
             cliente.id = id;
         query.equalTo("cliente", cliente);
       }

       if(vector[1].id == ""){
         query.exists("area")
       }else{
         var id = vector[1].id ;
         var area = Parse.Object.extend("areaWell");
         var area = new area();
             area.id = id;
         query.equalTo("area", area);
       }

       if(vector[2].id == ""){
         query.exists("generacion")
       }else{
         var id = vector[2].id ;
         var Generacion = Parse.Object.extend("genWell");
         var generacion = new Generacion();
             generacion.id = id;
         query.equalTo("generacion", generacion);
       }

       if(vector[3].id == ""){
         query.exists("antiguedad")
       }else{
         var id = vector[3].id ;
         var Antiguedad = Parse.Object.extend("Antiguedad");
         var antiguedad = new Antiguedad();
             antiguedad.id = id;
         query.equalTo("antiguedad", antiguedad);
       }



       query.find({
         success: function(results) {
           var totalB = results.length;
           var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;

           for (var i = 0; i < results.length; i++) {
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
           }

           var fct = t / results.length;
           var fcrt = rt / results.length;
           var fcr = r / results.length;
           var fcrb = rb / results.length;
           var fcb = b / results.length;
           var fclb = lb / results.length;
           var fcl = l / results.length;
           var fclt = lt / results.length;
           var fceb = eb / results.length;
           var pTotal = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9).toFixed(1);
           fct = (t / results.length);
           fcrt = (rt / results.length);
           fcr = (r / results.length);
           fcrb = (rb / results.length);
           fcb = (b / results.length);
           fclb = (lb / results.length);
           fcl = (l / results.length);
           fclt = (lt / results.length);
           fceb = (eb / results.length);


           var ctx = document.getElementById("myChart");
           var myChart = new Chart(ctx, {
             type: 'radar',
             data: {
               labels: [".", ".", ".", ".", ".", ".", ".", ".", "."],
               datasets: [{
                 backgroundColor: "rgba(253, 99, 68, 0.81)",
                 borderColor: "rgba(253, 86, 53, 1)",
                 data: [fct, fcrt, fcr, fcrb, fcb, fclb, fcl, fclt, fceb]
               }]
             },
             options: {
              legend: { display: false },
              scale: {
            ticks: {
                beginAtZero: true,
                max: 5
            }
           }
             }
           });


           //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
           var total2 = parseFloat(pTotal);
           var t2 = total2 + response;
           azul = total2;
           if (pTotal == 'NaN') {
             $("#promedioTotalAzul").html('NA');
           } else {
            $("#promedioTotalAzul").html(pTotal);
           }

           promise.resolve(t2);

           /*if (pTotal == 'NaN'){
            $("#promedioTotalAzul").html(0);
           }else{

             $("#pgeneral").html(final);
           }*/


         },
         error: function(error) {
           alert("Error: " + error.code + " " + error.message);
         }
       });
     })
     return promise
   }



   circuloVerde() {
     var promise = new Parse.Promise();
     var vector = this.getGET();


     this.circuloAzul().then((pAzul: any) => {

       var Evaluacion = Parse.Object.extend("WellEmocional");
       var query = new Parse.Query(Evaluacion);

       if(vector[0].id == ""){
         query.exists("cliente")
       }else{
         var id = vector[0].id ;
         var Cliente = Parse.Object.extend("ClienteWell");
         var cliente = new Cliente();
             cliente.id = id;
         query.equalTo("cliente", cliente);
       }

       if(vector[1].id == ""){
         query.exists("area")
       }else{
         var id = vector[1].id ;
         var area = Parse.Object.extend("areaWell");
         var area = new area();
             area.id = id;
         query.equalTo("area", area);
       }

       if(vector[2].id == ""){
         query.exists("generacion")
       }else{
         var id = vector[2].id ;
         var Generacion = Parse.Object.extend("genWell");
         var generacion = new Generacion();
             generacion.id = id;
         query.equalTo("generacion", generacion);
       }

       if(vector[3].id == ""){
         query.exists("antiguedad")
       }else{
         var id = vector[3].id ;
         var Antiguedad = Parse.Object.extend("Antiguedad");
         var antiguedad = new Antiguedad();
             antiguedad.id = id;
         query.equalTo("antiguedad", antiguedad);
       }

       query.find({
         success: function(results) {
           var totalG = results.length;
           var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
           for (var i = 0; i < results.length; i++) {
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
           }

           var fct = t / results.length;
           var fcrt = rt / results.length;
           var fcr = r / results.length;
           var fcrb = rb / results.length;
           var fcb = b / results.length;
           var fclb = lb / results.length;
           var fcl = l / results.length;
           var fclt = lt / results.length;
           var fceb = eb / results.length;
           var pTotal = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9).toFixed(1);
           fct = (t / results.length);
           fcrt = (rt / results.length);
           fcr = (r / results.length);
           fcrb = (rb / results.length);
           fcb = (b / results.length);
           fclb = (lb / results.length);
           fcl = (l / results.length);
           fclt = (lt / results.length);
           fceb = (eb / results.length);






           var ctx = document.getElementById("myChartGreen");
           var myChart = new Chart(ctx, {
             type: 'radar',
             data: {
               labels: [".", ".", ".", ".", ".", ".", ".", ".", "."],
               datasets: [{
                 backgroundColor: "rgba(253, 99, 68, 0.81)",
                 borderColor: "rgba(253, 86, 53, 1)",
                 data: [fct, fcrt, fcr, fcrb, fcb, fclb, fcl, fclt, fceb]
               }]
             },
             options: {
              legend: { display: false },
              scale: {
            ticks: {
                beginAtZero: true,
                max: 5
            }
        }
             }
           });


           totalEncuestas += totalG;
           $("#encuestas").html("Total de encuestas: " + totalEncuestas);
           //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
           var total3 = parseFloat(pTotal);
           verde = total3;
           var t3 = total3 + pAzul;
           var final = (t3 / 3).toFixed(1);
           totalGral = pTotal;
           if (pTotal == 'NaN') {
             $("#promedioTotalVerde").html('NA');
             $("#pgeneral").html('NA');
           } else {
             $("#promedioTotalVerde").html(pTotal);
             $("#pgeneral").html(final);
           }


         },
         error: function(error) {
           alert("Error: " + error.code + " " + error.message);
         }
       });

     })
   }


   datosCliente(){
     var vector = this.getGET();
    var date = new Date();
     if(vector[1].id== '' && vector[2].id =='' && vector[3].id =='' && vector[0].id != ''){
       var id = vector[0].id ;
       var Cliente = Parse.Object.extend("ClienteWell");
       var cliente = new Cliente();
          cliente.id = id;
       var query = new Parse.Query(Cliente);
           query.equalTo('objectId', id);
            query.find({
              success: function(res){
                $("#numEmpleados").show();
                $("#numEmpleados").html("De: "+res[0].get("noEmpleados")+" Empleados")
                var queryLink = new Parse.Query("LinksWell");
                queryLink.equalTo("cliente",cliente);
                queryLink.find({
                  success: function(resLink){
                    var limite = resLink[0].get('fechaLimite');
                    var dateLimite = new Date(limite);
                      if(dateLimite < date){
                        $("#linkAc").show();
                        $("#linkAc").html("Status: link inactivo")
                      }else{
                        $("#linkAc").show();
                        $("#linkAc").html("Status: link activo")
                      }
                  }
                })
              }
            })

     }
   }


/*addAreas(){
  var array = this.getGET();
  clienteEncuesta = array[0].id
  var AreaWell  = Parse.Object.extend('areaWell');
  var Cliente  = Parse.Object.extend('ClienteWell');
  var cliente = new Cliente();
      cliente.id = clienteEncuesta;
  var queryArea  = new Parse.Query(AreaWell);
      queryArea.exists('cliente');
      queryArea.equalTo('cliente', cliente);
      queryArea.find({
        success: function(resAreas){
          for (let i = 0; i < resAreas.length; i++) {
              arrayAreasWell.push({nombre:resAreas[i].get("Name"), id: resAreas[i].id});
          }
          var queryAreasSCli = new Parse.Query('areaWell');
              queryAreasSCli.doesNotExist('cliente')
              queryAreasSCli.find({
                success: function(areasSCliente){
                  for (let i = 0; i < areasSCliente.length; i++) {
                    arrayAreasWell.push({nombre:resAreas[i].get("Name"), id: resAreas[i].id});

                  }
                  console.log(arrayAreasWell);
                }
              })

        }
      })

}*/


   addGeneracion(){

     var Generacion = Parse.Object.extend("genWell");
     var query = new Parse.Query(Generacion);
         query.find({
           success: function(res){
             for (var i = 0; i < res.length; i++) {
               arrayGeneracion.push({nombre:res[i].get("Nombre"), id: res[i].id, orden: res[i].get("orden")})
                 //$("#genWell").append('<li id='+res[i].id+'>'+res[i].get("Nombre")+'</li>');
             }
           }
         })

   }

   addAntiguedad(){
     var Antiguedad = Parse.Object.extend("Antiguedad");
     var query = new Parse.Query(Antiguedad);
       query.find({
         success: function(res){
           for (var i = 0; i < res.length; i++) {
             arrayAnt.push({nombre: res[i].get("nombre"), id: res[i].id});
               //$("#antigWell").append('<li id='+res[i].id+'>'+res[i].get("nombre")+'</li>');
           }
         }
       })

   }



       /* las siguientes 3 funciones obtienen
       la información para mostar un reporte general de generación  */
       reporteGeneracion(){
           var Wellbeing = Parse.Object.extend('Wellbeing');
           var promise = new Parse.Promise();

           for (let i = 0; i < arrayGeneracion.length; i++) {
             var GenWell  = Parse.Object.extend('genWell');
             var Cliente  = Parse.Object.extend('ClienteWell');
             var generacion = new GenWell();
                 generacion.id = arrayGeneracion[i].id;
             var cliente = new Cliente();
                 cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                 query.equalTo("cliente", cliente)
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
                         arrGenAmarillo.push({nombre: arrayGeneracion[i].nombre,
                                             total: pTotal.toFixed(1),
                                             orden: arrayGeneracion[i].orden})
                     }else{
                       arrGenAmarillo.push({nombre: arrayGeneracion[i].nombre, total: 'NA',orden: arrayGeneracion[i].orden})
                     }

                     promise.resolve(arrGenAmarillo.sort(comparar))
                   }
                 })

           }//termina for array Generaciones
           return promise;

         }

       reporteGenAzul(){
             var Wellbeing = Parse.Object.extend('WellCognitivo');
             var promise = new Parse.Promise();
           this.reporteGeneracion().then((result: any) =>{
               for (let i = 0; i < arrayGeneracion.length; i++) {
                 var GenWell  = Parse.Object.extend('genWell');
                 var Cliente  = Parse.Object.extend('ClienteWell');
                 var generacion = new GenWell();
                     generacion.id = arrayGeneracion[i].id;
                 var cliente = new Cliente();
                     cliente.id = clienteEncuesta;
                 var query  = new Parse.Query(Wellbeing);
                     query.equalTo("cliente", cliente)
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
         var Wellbeing = Parse.Object.extend('WellEmocional');
         var promise = new Parse.Promise();
         this.reporteGenAzul().then((results: any) =>{
           for (let i = 0; i < arrayGeneracion.length; i++) {
             var GenWell  = Parse.Object.extend('genWell');
             var Cliente  = Parse.Object.extend('ClienteWell');
             var generacion = new GenWell();
                 generacion.id = arrayGeneracion[i].id;
             var cliente = new Cliente();
                 cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                 query.equalTo("cliente", cliente)
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


       reporteAreaAmarillo(){
         var Wellbeing = Parse.Object.extend('Wellbeing');
         var promise = new Parse.Promise();
           this.reporteGenVerde().then((results: any) => {
             for (let i = 0; i <  areasCliente.length; i++) {
               var AreaWell  = Parse.Object.extend('areaWell');
               var area = new AreaWell();
                   area.id =  areasCliente[i].id;
                   var Cliente  = Parse.Object.extend('ClienteWell');
                   var cliente = new Cliente();
                       cliente.id = clienteEncuesta;

               var query  = new Parse.Query(Wellbeing);
                   query.equalTo("cliente", cliente)
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
                           arrAreaAmarillo.push({nombre:  areasCliente[i].nombre,
                                               total: pTotal.toFixed(1)})
                       }else{
                         arrAreaAmarillo.push({nombre:  areasCliente[i].nombre, total: 'NA'})
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
           for (let i = 0; i <  areasCliente.length; i++) {
             var AreaWell  = Parse.Object.extend('areaWell');
             var area = new AreaWell();
                 area.id =  areasCliente[i].id;
                 var Cliente  = Parse.Object.extend('ClienteWell');
                 var cliente = new Cliente();
                     cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                query.equalTo("cliente", cliente)
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
                       arrAreaAzul.push({nombre:  areasCliente[i].nombre,
                                       total: pTotal.toFixed(1)})
                     }else{
                       arrAreaAzul.push({nombre:  areasCliente[i].nombre, total: 'NA'})
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
           for (let i = 0; i <  areasCliente.length; i++) {
             var AreaWell  = Parse.Object.extend('areaWell');
             var area = new AreaWell();
                 area.id =  areasCliente[i].id;
                 var Cliente  = Parse.Object.extend('ClienteWell');
                 var cliente = new Cliente();
                     cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                 query.equalTo("cliente", cliente)
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
                       arrAreaVerde.push({nombre:  areasCliente[i].nombre,
                                         total: pTotal.toFixed(1)})
                     }else{
                       arrAreaVerde.push({nombre:  areasCliente[i].nombre, total: 'NA'})
                     }
                       promise.resolve(arrAreaVerde.sort(compararNombre))
                   }
                 })
           }//termina for primer arreglo
         })
         return promise;
       }

       reporteAntAmarillo(){
         var Wellbeing = Parse.Object.extend('Wellbeing');
         var promise = new Parse.Promise();
           this.reporteAreaVerde().then((results: any) => {
             for (let i = 0; i < arrayAnt.length; i++) {
               var AntWell  = Parse.Object.extend('Antiguedad');
               var antiguedad = new AntWell();
                   antiguedad.id = arrayAnt[i].id;
                   var Cliente  = Parse.Object.extend('ClienteWell');
                   var cliente = new Cliente();
                       cliente.id = clienteEncuesta;
               var query  = new Parse.Query(Wellbeing);
                   query.equalTo("cliente", cliente);
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
                                               total: pTotal.toFixed(1)})
                       }else{
                         arrAntAmarillo.push({nombre: arrayAnt[i].nombre, total: 'NA'})
                       }
                       promise.resolve(arrAntAmarillo.sort(compararNombre))
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
                 var Cliente  = Parse.Object.extend('ClienteWell');
                 var cliente = new Cliente();
                     cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                 query.equalTo("cliente", cliente);
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
                                       total: pTotal.toFixed(1)})
                     }else{
                       arrAntAzul.push({nombre: arrayAnt[i].nombre, total: 'NA'})
                     }
                     promise.resolve(arrAntAzul.sort(compararNombre))
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
                 var Cliente  = Parse.Object.extend('ClienteWell');
                 var cliente = new Cliente();
                     cliente.id = clienteEncuesta;
             var query  = new Parse.Query(Wellbeing);
                 query.equalTo("cliente", cliente);
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
                                         total: pTotal.toFixed(1)})
                     }else{
                       arrAntVerde.push({nombre: arrayAnt[i].nombre, total: 'NA'})
                     }
                       promise.resolve(arrAntVerde.sort(compararNombre))
                   }
                 })
           }//termina for primer arreglo
         })
         return promise;
       }




       getInd(){
         this.reporteAntVerde().then((results: any) =>{
           /*console.log(arrGenAmarillo);
           console.log(arrGenAzul);
           console.log(arrGenVerde);
           console.log(arrAreaAmarillo);
           console.log(arrAreaAzul);
           console.log(arrAreaVerde);
           console.log(arrAntAmarillo);
           console.log(arrAntAzul);
           console.log(results);*/

         })
       }

       sigPaso(){
         $("#modalAlert").modal('toggle');
         this.reporteAntVerde().then((results: any) =>{
           /*console.log(arrGenAmarillo[0].nombre);
           console.log(arrGenAzul);
           console.log(arrGenVerde)
           console.log(arrAreaAmarillo);
           console.log(arrAreaAzul);
           console.log(arrAreaVerde);
           console.log(arrAntAmarillo);
           console.log(arrAntAzul);
           console.log(results);*/
           console.log('arrays done');
           crearImagen(crearImagenDone)
         })
       }

        imagenChart(){
          html2canvas($("#myChartYellow"), {
              onrendered: function(canvas) {
                  var theCanvas = canvas;
                  //document.body.appendChild(canvas);
                  //Canvas2Image.saveAsPNG(canvas);
                  //image.src = canvas.toDataURL("image/png");
                  console.log("primer paso")
                  //cb1(image.src);
              }
          });
       }

         crearPptx(){
           this.sigPaso();

         }

         Estadistica(){
           var noEmpleados;
           var vector = this.getGET();
           var promise = new Parse.Promise();
           var Cliente = Parse.Object.extend('ClienteWell');
           var cliente = new Cliente();
               cliente.id = vector[0].id;
           var queryCliente = new Parse.Query(Cliente);
               queryCliente.equalTo('objectId', vector[0].id)
               queryCliente.find({
                 success: function(res){
                   pobTotal = res[0].get('noEmpleados');//numero de empleados
                   var queryEncuesta = new Parse.Query('Wellbeing');
                       queryEncuesta.equalTo('cliente', cliente);
                       queryEncuesta.count({
                         success: function(noRespuestas){//total RESPUESTAS
                           numRespuestas = noRespuestas;
                           statusFinal = (noRespuestas * 100)/pobTotal;

                           var queryAreas = new Parse.Query('areaWell');
                               queryAreas.exists('cliente');
                               queryAreas.equalTo('cliente', cliente);
                               queryAreas.find({
                                 success: function(areasClienteRes){
                                   for (let i = 0; i < areasClienteRes.length; i++) {
                                       areasCliente.push({nombre: areasClienteRes[i].get('Name'),
                                                              id: areasClienteRes[i].id})
                                   }
                                   var queryAreasSCli = new Parse.Query('areaWell');
                                       queryAreasSCli.doesNotExist('cliente')
                                       queryAreasSCli.find({
                                         success: function(areasSCliente){
                                           for (let i = 0; i < areasSCliente.length; i++) {
                                             areasCliente.push({nombre: areasSCliente[i].get('Name'),
                                                                    id: areasSCliente[i].id})
                                           }
                                           promise.resolve(areasCliente)
                                         }
                                       })
                                 }
                            })
                         }
                       });
                 }
               })
               return promise
         }

         totalesAreas(){
           this.Estadistica().then((response: any)=>{
             console.log(response)
             var Area = Parse.Object.extend('areaWell')
             for (let i = 0; i < response.length; i++) {
                var queryEncuesta = new Parse.Query('Wellbeing');
               var area = new Area();
                  area.id = response[i].id
                 queryEncuesta.equalTo('area', area);
                 queryEncuesta.count({
                   success: function(res){
                     console.log(res);
                     arrayEstadisticas.push({nombre:response[i].nombre, total:res})
                   }
                 })
             }

           })
         }


  ngOnInit() {
    arrayEstadisticas = [];
    arrGenAmarillo.length = 0;
    arrGenAzul.length = 0;
    arrGenVerde.length = 0;
    arrIndAmarillo.length = 0;
    arrIndAzul.length = 0;
    arrIndVerde.length = 0;
    arrAreaAmarillo.length = 0;
    arrAreaAzul.length = 0;
    arrAreaVerde.length = 0;
    arrAntAmarillo.length = 0;
    arrAntAzul.length = 0;
    arrAntVerde.length = 0;
    statusFinal = 0;
    pobTotal = 0;
    numRespuestas = 0;
    areasCliente.length = 0;
    totalGral = 0;
    var testScript = document.createElement("script");
    testScript.setAttribute("id", "testScript");
    testScript.setAttribute("src", "assets/PptxGenJS/dist/pptxgen.js");
    document.body.appendChild(testScript);

    var testScript2 = document.createElement("script");
    testScript2.setAttribute("id", "testScript");
    testScript2.setAttribute("src", "assets/PptxGenJS/libs/jszip.min.js");
    document.body.appendChild(testScript2);

    this.circuloVerde();
    this.regresaInd();
    this.datosCliente();
    this.addGeneracion();
    //this.addAreas();
    this.addAntiguedad();
    this.muestraBoton();
    this.totalesAreas();
    var array = this.getGET();
    clienteEncuesta = array[0].id
    statusFinal = 0;
    pobTotal = 0;
    numRespuestas = 0;

  }


}



function comparar(a, b) {
  var x = a.orden;
var y = b.orden;
return x < y ? -1 : x > y ? 1 : 0;
}

function compararNombre(a, b) {
  var x = a.nombre;
  var y = b.nombre;
return x < y ? -1 : x > y ? 1 : 0;
}


function crearImagen(cb1){
  var image = new Image();
  var amarillo = new Image();
  html2canvas($("#generales"), {
      onrendered: function(canvas) {
          var theCanvas = canvas;
          //document.body.appendChild(canvas);
          //Canvas2Image.saveAsPNG(canvas);
          image.src = canvas.toDataURL("image/png");
          console.log("primer paso")
          arrInfoImg.push(image.src);
          cb1(arrInfoImg);
      }
  });

  //return image;
}



function crearImagenDone(infoImage: any){
  console.log("2do paso")
  crearImgAmarillo(infoImage, crearImgAmaDone);
  //crearReporte(infoImage);
}

function crearImgAmarillo(arrayInfo: any, cb2){
  var image = new Image();
  var amarillo = new Image();
  html2canvas($("#myChartYellow"), {
      onrendered: function(canvas) {
          var theCanvas = canvas;
          //document.body.appendChild(canvas);
          Canvas2Image.saveAsPNG(canvas);
          image.src = canvas.toDataURL("image/png");
          console.log("primer paso")
          console.log(image.src);
          arrInfoImg.push(image.src);
          cb2(arrayInfo);
      }
  });
}

function crearImgAmaDone(arrInfo: any){
  console.log(arrInfo);
  crearReporte(arrInfo);
}

function crearReporte(info: any){
  try{
    var date = new Date();
    var cAmarillo = 'assets/img/yellow_circle.svg', cAzul = 'assets/img/blue_circle.svg', cVerde = 'assets/img/green_circle.svg';

    var dataimage = info[0].substring(info.indexOf(":")+1);
    var dataImageAm = info[1].substring(info.indexOf(":")+1);
    //console.log(info);
    //considerar agregar condicional para agregar las slides
    var pptx = new PptxGenJS();
    var slideTitulo = pptx.addNewSlide();
    var slideEstadistica = pptx.addNewSlide();
    var slide = pptx.addNewSlide();//slide general
    var slideYellow = pptx.addNewSlide();
    var slideBlue = pptx.addNewSlide();
    var slideGreen = pptx.addNewSlide();
    var slideR = pptx.addNewSlide();

    if(arrAreaAmarillo.length <= 4){
      var slideArea = pptx.addNewSlide();
    }else if(arrAreaAmarillo.length <= 8){
      var slideArea = pptx.addNewSlide();
      var slideArea2 = pptx.addNewSlide();
      slideArea2.addText('ÁREA', { x:4.6, y:0.5, font_size:18, color:'363636' });
      slideArea2.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
      slideArea2.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
      slideArea2.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    }else if(arrAreaAmarillo.length <= 12){
      var slideArea = pptx.addNewSlide();
      var slideArea2 = pptx.addNewSlide();
      var slideArea3 = pptx.addNewSlide();
    }else if(arrAreaAmarillo.length <= 16){
      var slideArea = pptx.addNewSlide();
      var slideArea2 = pptx.addNewSlide();
      var slideArea3 = pptx.addNewSlide();
      var slideArea4 = pptx.addNewSlide();
    }


    var slideAnt = pptx.addNewSlide();
    var slideGrafico = pptx.addNewSlide();
    var slideGraficoInd = pptx.addNewSlide();
    var slideGraficoA = pptx.addNewSlide();
    var slideGraficoAnt = pptx.addNewSlide();


    var datosGraf = [];
    var datosArea = [];
    var datosAnt = [];
    var datosInd = [];



    for (let i = 0; i < arrGenAmarillo.length; i++) {
      var total = (parseFloat(arrGenAmarillo[i].total) + parseFloat(arrGenAzul[i].total) + parseFloat(arrGenVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosGraf.push(total)
      }else{
        var porcentaje = (total * 100)/5;
        datosGraf.push(porcentaje)
      }
    }


    for (let i = 0; i < arrAreaAmarillo.length; i++) {
      var total = (parseFloat(arrAreaAmarillo[i].total) + parseFloat(arrAreaAzul[i].total) + parseFloat(arrAreaVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosArea.push(total)
      }else{
        datosArea.push(total)
      }
    }

    for (let i = 0; i < arrAntAmarillo.length; i++) {

      var total = (parseFloat(arrAntAmarillo[i].total) + parseFloat(arrAntAzul[i].total) + parseFloat(arrAntVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosAnt.push(total)
      }else{
        var porcentaje = (total * 100)/5;
        datosAnt.push(porcentaje)
      }
    }

    for (let i = 0; i < arrIndAmarillo.length; i++) {
      var total = (parseFloat(arrIndAmarillo[i].total) + parseFloat(arrIndAzul[i].total) + parseFloat(arrIndVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosInd.push(total)
      }else{
        datosInd.push(total)
      }
    }

  /*  var dataChartPieGen = [{ name: 'Generación',
    labels: [arrGenAmarillo[0].nombre, arrGenAmarillo[1].nombre, arrGenAmarillo[2].nombre, arrGenAmarillo[3].nombre, arrGenAmarillo[4].nombre],
    values: [  datosGraf[0],   datosGraf[1],   datosGraf[2],   datosGraf[3],   datosGraf[4]]
}];

slideGrafico.addText('Generación', { x:5.0, y:0.5, font_size:18, color:'363636' })
slideGrafico.addChart(pptx.charts.PIE, dataChartPieGen,
    {
        x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
        chartColors:['73CD52','92D04F','ADD24F','82d586'], dataLabelColor:'FFFFFF'
    });

    var dataChartPieArea = [{ name: 'Área',
    labels: [arrAreaAmarillo[0].nombre, arrAreaAmarillo[1].nombre, arrAreaAmarillo[2].nombre, arrAreaAmarillo[3].nombre, arrAreaAmarillo[4].nombre],
    values: [  datosArea[0],   datosArea[1],   datosArea[2],   datosArea[3],   datosArea[4]]
}];
    slideGraficoA.addText('Área', { x:5.0, y:0.5, font_size:18, color:'363636' })
    slideGraficoA.addChart(pptx.charts.PIE, dataChartPieArea,
        {
            x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
            chartColors:['0079AE','0091D0','4cc3c0','ACCDEC', '53aac6', '3e9abb', '6cabce', '328b95'], dataLabelColor:'FFFFFF'
        });


        var dataChartPieAnt = [{ name: 'Antigüedad',
        labels: [arrAntAmarillo[0].nombre, arrAntAmarillo[1].nombre, arrAntAmarillo[2].nombre, arrAntAmarillo[3].nombre],
        values: [  datosAnt[0],   datosAnt[1],   datosAnt[2],   datosAnt[3]]
    }];
        slideGraficoInd.addText('Antigüedad', { x:5.0, y:0.5, font_size:18, color:'363636' })
        slideGraficoInd.addChart(pptx.charts.PIE, dataChartPieAnt,
            {
                x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
                chartColors:['E9B200','FFC000','FFD243','FFE286'], dataLabelColor:'FFFFFF'
            });*/

    slideTitulo.addText('Wellbeing Research',{x: 6, y:2, font_size:22, color:'363636' });
    slideTitulo.addText(nombreCliente, {x:7, y:2.5, font_size:18, color:'363636'});
    //****agregar fecha de reporte
    //slideTitulo.addText(date, {x:4, y:4.2, font_size:18, color:'363636'})



    var dataChartGen = [
    { name: 'Region 1', labels: [arrGenAmarillo[0].nombre, arrGenAmarillo[1].nombre,
        arrGenAmarillo[2].nombre, arrGenAmarillo[3].nombre, arrGenAmarillo[4].nombre], values: [datosGraf[0],   datosGraf[1],   datosGraf[2],   datosGraf[3],   datosGraf[4]] },
];

var dataChartAnt = [
{ name: 'Region 1', labels: [arrAntAmarillo[0].nombre, arrAntAmarillo[1].nombre,
  arrAntAmarillo[2].nombre, arrAntAmarillo[3].nombre], values: [datosAnt[0],   datosAnt[1],   datosAnt[2],   datosAnt[3]] }
];

slideEstadistica.addChart(
    pptx.charts.BAR, dataChartGen,
    { x:5.3, y:0.9, w:3.5, h:2, barDir:'bar', catAxisLabelColor:'0000CC', catAxisLabelFontFace:'Courier' }
);

slideEstadistica.addChart(
    pptx.charts.BAR, dataChartAnt,
    { x:5.3, y:2.9, w:3.5, h:2, barDir:'bar', catAxisLabelColor:'0000CC', catAxisLabelFontFace:'Courier' }
);

    slideEstadistica.addText('Estadisticas de la muestra',{x: 1, y:0.5, font_size:20, color:'363636' })
    slideEstadistica.addText('STATUS FINAL',{x: 1, y:0.9, font_size:9, color:'363636' })
    slideEstadistica.addText(statusFinal.toFixed(1),{x: 4, y:0.9, font_size:9, color:'363636' })
    slideEstadistica.addText('POBLACION TOTAL',{x: 1, y:1.3, font_size:9, color:'363636' })
    slideEstadistica.addText(pobTotal,{x: 4, y:1.3, font_size:9, color:'363636' })
    slideEstadistica.addText('NÚMERO DE RESPUESTAS',{x: 1, y:1.5, font_size:9, color:'363636' })
    slideEstadistica.addText(numRespuestas,{x: 4, y:1.5, font_size:9, color:'363636' })

    var Ax = 0, Ay = 1.9, tAx = 0, tAy = 1.9;

    var i = 0;
    do{
      slideEstadistica.addText(arrayEstadisticas[i].nombre,{x: 1, y:Ay, font_size:9, color:'363636' })
      slideEstadistica.addText(arrayEstadisticas[i].total,{x: 4, y:tAy, font_size:9, color:'363636' })
      Ay +=0.2;
      tAy +=0.2;
      i++
    }while(i<arrayEstadisticas.length)


    slide.addText('ÍNDICE DE BIENESTAR GLOBAL '+nombreCliente.toUpperCase(), { x:1.0, y:0.5, font_size:18,font_face:'Arial Black', color:'363636' });
    slide.addImage({x:1.5, y:1.3, w:3, h:3, path:'assets/img/gray_circle.svg'});
    slide.addText(totalGral,{x:2, y:2.6, font_size:105, font_face:'Calibri', color:'FBC100'})
    slide.addText('Media nacional: ',{x:4.7, y:2.3, font_size:20, font_face:'Helvetica Neue Light', color:'363636'});
    slide.addText('Media del sector: ',{x:4.7, y:2.7, font_size:20, font_face:'Helvetica Neue Light', color:'363636'})

    slideYellow.addText('Índice de bienestar físico',{x:1, y:0.5, font_size:28,font_face:'Arial', color:'363636'});
    slideYellow.addImage({x:1.5, y:1.3, w:2.5, h:2.5, path: 'assets/img/yellowCircleSlim.svg'});
    slideYellow.addImage({x:1.8, y:1.6, w:2, h:2, data:dataImageAm});
    slideYellow.addText('3.5',{x:2.2, y:4, font_size:50, font_face:'Calibri', color:'FBC100'})
    slideYellow.addText('Media nacional: ', {x:2, y:4.5, font_size:11,font_face:'Arial', color:'363636'})
    slideYellow.addText('Media del sector:', {x:1.7, y:4.7, font_size:11,font_face:'Arial', color:'363636'})

    slideYellow.addText('Valor promedio de cada categoría', {x:5, y:1, font_size:12,font_face:'Arial', color:'363636'})
    slideYellow.addText('Tengo opciones para trabajar en distintas posturas físicas a lo largo del día.', {x:5, y:1.5, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:1.5, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('En un día de trabajo normal, estoy en constante movimiento.', {x:5, y:1.7, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:1.7, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('La temperatura de la oficina es la adecuada la mayor parte del tiempo.', {x:5, y:1.9, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:1.9, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('Considero que tengo un peso adecuado, normalmente elijo\n alimentos saludables .', {x:5, y:2.2, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:2.2, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('Mi espacio de trabajo es cómodo y no me genera dolores de\nespalda, cuello, etc..', {x:5, y:2.5, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:2.5, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('En mi opinion, mis horas de trabajo son las adecuadas,\n todas mis tareas las realizo dentro del horario laboral.', {x:5, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('Me siento lleno de vida y dinamismo.', {x:5, y:3, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:3, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('Estoy satisfecho con la iluminación en mi espacio de trabajo .', {x:5, y:3.2, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:3.2, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('Mi espacio de trabajo me permite estar en contacto con la\n naturaleza y/o espacios exteriores.', {x:5, y:3.4, font_size:8,font_face:'Arial', color:'363636'})
    slideYellow.addText('T1', {x:9, y:3.4, font_size:8,font_face:'Arial', color:'363636'})


    slideBlue.addText('Índice de bienestar cognitivo',{x:1, y:0.5, font_size:28,font_face:'Arial', color:'363636'});
    slideBlue.addImage({x:1.5, y:1.3, w:2.5, h:2.5, path: 'assets/img/blueCircleSlim.svg'});
    slideBlue.addImage({x:1.8, y:1.6, w:2, h:2, data:dataImageAm});
    slideBlue.addText('3.5',{x:2.2, y:4, font_size:50, font_face:'Calibri', color:'FBC100'})
    slideBlue.addText('Media nacional: ', {x:2, y:4.5, font_size:11,font_face:'Arial', color:'363636'})
    slideBlue.addText('Media del sector:', {x:1.7, y:4.7, font_size:11,font_face:'Arial', color:'363636'})
    slideBlue.addText('Valor promedio de cada categoría', {x:5, y:1, font_size:12,font_face:'Arial', color:'363636'})
    slideBlue.addText('Normalmente, siento que hice un avance en mi trabajo al finalizar\nel día.', {x:5, y:1.7, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:1.7, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Tengo acceso a una variedad de espacios que puedo adecuar\ndependiendo de mis actividades.', {x:5, y:2.0, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:2, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Mis niveles de estrés son bajos la mayor parte del tiempo.', {x:5, y:2.2, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:2.2, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Cuando así lo deseo, puedo pasar “desapercibido” al trabajar en\nespacios alternos a mi estación de trabajo.', {x:5, y:2.5, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:2.5, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Considero que puedo prestar plena atención a cada actividad que\nrealizo.', {x:5, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Puedo tener una conversacion confidencial con alguien.', {x:5, y:3, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:3, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Normalmente uso audífonos u otros elementos para bloquear las\ndistracciones del entorno.', {x:5, y:3.3, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:3.3, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Puedo tomar breaks de mis actividades y re-energizarme durante el\ndía.', {x:5, y:3.6, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:3.6, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('Tengo oportunidad de ser creativo y planear para el futuro.', {x:5, y:3.8, font_size:8,font_face:'Arial', color:'363636'})
    slideBlue.addText('T1', {x:9, y:3.8, font_size:8,font_face:'Arial', color:'363636'})


    slideGreen.addText('Índice de bienestar emocional',{x:1, y:0.5, font_size:28,font_face:'Arial', color:'363636'});
    slideGreen.addImage({x:1.5, y:1.3, w:2.5, h:2.5, path: 'assets/img/greenCircleSlim.svg'});
    slideGreen.addImage({x:1.8, y:1.6, w:2, h:2, data:dataImageAm});
    slideGreen.addText('Media nacional: ', {x:2, y:4.5, font_size:11,font_face:'Arial', color:'363636'})
    slideGreen.addText('Media del sector:', {x:1.7, y:4.7, font_size:11,font_face:'Arial', color:'363636'})
    slideGreen.addText('3.5',{x:2.2, y:4, font_size:50, font_face:'Calibri', color:'FBC100'})
    slideGreen.addText('Valor promedio de cada categoría', {x:5, y:1, font_size:12,font_face:'Arial', color:'363636'})
    slideGreen.addText('En mi organización, siento que mi persona y mis ideas importan.', {x:5, y:1.5, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:1.5, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Considero que mis compañeros de trabajo se preocupan por mí\ncomo persona.', {x:5, y:1.8, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:1.8, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('La gente tiende a hablar con consideración por los demás.', {x:5, y:2, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:2, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Confío en la mayoría de mis compañeros, puedo contar con ellos\npara encontrar soluciones cuando las cosas van mal.', {x:5, y:2.3, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:2.2, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Normalmente veo el impacto que mi trabajo tiene en otros o en la\norganización.', {x:5, y:2.6, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:2.5, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Me siento motivado y optimista para intentar cosas nuevas.', {x:5, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:2.8, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Siento que puedo ser yo mismo la mayor parte del tiempo, puedo\nser informal y espontáneo.', {x:5, y:3.1, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:3, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Mi líder toma en cuenta mis ideas y me apoya cuando lo necesito.', {x:5, y:3.3, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:3.3, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('Los objetivos y la misión de mi organización son personalmente\nsignificativos para mí.',{x:5, y:3.6, font_size:8,font_face:'Arial', color:'363636'})
    slideGreen.addText('T1', {x:9, y:3.5, font_size:8,font_face:'Arial', color:'363636'})

    //slide.addImage({x:3.5, y:.8, w:2.8, h:2,data: info})


  /*  slide.addText('FÍSICO '+amarillo.toFixed(1),{x:1, y:3.0, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slide.addImage({
      x:1, y:3.5, w:1.5, h:1.5,
      path: 'assets/img/yellow_circle.svg'
    })
    slide.addText('COGNITIVO '+azul.toFixed(1),{x:4, y:3.0, font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slide.addImage({
      x:4.5, y:3.5, w:1.5, h:1.5,
      path: 'assets/img/blue_circle.svg'
    })
    slide.addText('EMOCIONAL '+verde.toFixed(1),{x:7, y:3.0, font_size:18, font_face:'Arial Black', color:'98CE3D'})
    slide.addImage({
      x:7.6, y:3.5, w:1.5, h:1.5,
      path: 'assets/img/green_circle.svg'
    })*/
    console.log('hasta aquí llega');
    slideR.addText('GENERACIÓN', { x:4.2, y:0.5, font_size:18, color:'363636' });
    slideR.addText(arrGenAmarillo[0].nombre, {x:0.6, y:1.5, font_size:18, color:'363636'})
    slideR.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideR.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideR.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideR.addText(datosGraf[0].toFixed(1), {x:1.27, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:1.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[0].total, {x:1.27, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:1.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[0].total, {x:1.27, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:1.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[0].total, {x:1.27, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    console.log('ya no');

    slideR.addText(arrGenAmarillo[1].nombre, {x:2.7, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[1].toFixed(1), {x:3.15, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:3.1, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[1].total, {x:3.13, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:3.1, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[1].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[1].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    console.log('hasta aquí llega 2');

    slideR.addText(arrGenAmarillo[2].nombre, {x:4.5, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[2].toFixed(1), {x:4.9, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:4.9, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[2].total, {x:4.95, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:4.9, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[2].total, {x:4.95, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:4.9, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[2].total, {x:4.95, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

console.log('hasta aquí llega 3');
    slideR.addText(arrGenAmarillo[3].nombre, {x:6.2, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[3].toFixed(1), {x:6.6, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:6.6, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[3].total, {x:6.65, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:6.6, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[3].total, {x:6.65, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:6.6, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[3].total, {x:6.65, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideR.addText(arrGenAmarillo[4].nombre, {x:7.9, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[4].toFixed(1), {x:8.25, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:8.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[4].total, {x:8.25, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:8.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[4].total, {x:8.25, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:8.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[4].total, {x:8.25, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    var fx = 0.5 , fy = 2.6; //valor fisicoX
    var cx = 0.5, cy = 3.6; //valores cognitivos
    var ex = 0.5, ey = 4.6; //valores EMOCIONAL
    var cAx = 2, cAy = 2.4; //valores imagen círculo amarillo
    var w = 0.7, h = 0.7; //medidas para todas la imagenes de circulos
    var nameAreasX, nameAreasY;//valores para nombres de áreas
    var t0x, t0y, t1x, t1y, t2x, t2y, t3x, t3y;
    var tAm0x, tAm0y, tAz0x, tAz0y,tV0x, tV0y;
    var imgAx, imgAy, imgAzX, imgAzY, imgVx, imgVy;


    slideArea.addText('ÁREA', { x:4.6, y:0.5, font_size:18, color:'363636' });
    slideArea.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideArea.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideArea.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })


      for (let i = 0; i < 4; i++) { //probar con un do while

        if(i == 0){//las variables tienen que tomar los valores del arreglo en posicion 0
          nameAreasX = 1.6;
          nameAreasY = 1.5;
          t0x = 2, t0y =2.1;
          tAm0x = 2, tAm0y = 2.6, tAz0x = 2, tAz0y = 3.6 ,tV0x = 2, tV0y = 4.6;
          imgAx = 2, imgAy = 2.4, imgAzX = 2, imgAzY = 3.4, imgVx = 2, imgVy = 4.4;

        }else if(i == 1){
          nameAreasX = 4.1;
          nameAreasY = 1.5;
          t0x = 4.69, t0y =2.1;
          tAm0x = 4.73, tAm0y = 2.6, tAz0x = 4.73, tAz0y = 3.6 ,tV0x = 4.73, tV0y = 4.6;
          imgAx = 4.7, imgAy = 2.4, imgAzX = 4.7, imgAzY = 3.4, imgVx = 4.7, imgVy = 4.4;
        }else if(i == 2){
          nameAreasX = 6.4;
          nameAreasY = 1.5;
          t0x = 6.68, t0y =2.1;
          tAm0x = 6.68, tAm0y = 2.6, tAz0x = 6.68, tAz0y = 3.6 ,tV0x = 6.68, tV0y = 4.6;
          imgAx = 6.68, imgAy = 2.4, imgAzX = 6.68, imgAzY = 3.4, imgVx = 6.68, imgVy = 4.4;
        }else if(i == 3){
          nameAreasX = 7.72;
          nameAreasY = 1.5;
          t0x = 8.2, t0y =2.1;
          tAm0x = 8.09, tAm0y = 2.6, tAz0x = 8.09, tAz0y = 3.6 ,tV0x = 8.09, tV0y = 4.6;
          imgAx = 8.07, imgAy = 2.4, imgAzX = 8.07, imgAzY = 3.4, imgVx = 8.07, imgVy = 4.4;
        }

        slideArea.addText(arrAreaAmarillo[i].nombre, {x:nameAreasX, y:nameAreasY, font_size:18, color:'363636'})
        slideArea.addText(datosArea[i].toFixed(1), {x:t0x, y:t0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})

        slideArea.addImage({x:imgAx, y:imgAy, w:w, h:h,path: cAmarillo})
        slideArea.addText(arrAreaAmarillo[i].total, {x:tAm0x, y:tAm0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})
        slideArea.addImage({x:imgAzX, y:imgAzY, w:w, h:h,path: cAzul})
        slideArea.addText(arrAreaAzul[i].total, {x:tAz0x, y:tAz0y  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
        slideArea.addImage({x:imgVx, y:imgVy, w:w, h:h,path: cVerde})
        slideArea.addText(arrAreaVerde[i].total, {x:tV0x, y:tV0y  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


      }

      for (let i = 4; i < 8; i++) {

                if(i == 4){//las variables tienen que tomar los valores del arreglo en posicion 0
                  nameAreasX = 1.6;
                  nameAreasY = 1.5;
                  t0x = 2, t0y =2.1;
                  tAm0x = 2, tAm0y = 2.6, tAz0x = 2, tAz0y = 3.6 ,tV0x = 2, tV0y = 4.6;
                  imgAx = 2, imgAy = 2.4, imgAzX = 2, imgAzY = 3.4, imgVx = 2, imgVy = 4.4;

                }else if(i == 5){
                  nameAreasX = 3.9;
                  nameAreasY = 1.5;
                  t0x = 4.69, t0y =2.1;
                  tAm0x = 4.73, tAm0y = 2.6, tAz0x = 4.73, tAz0y = 3.6 ,tV0x = 4.73, tV0y = 4.6;
                  imgAx = 4.7, imgAy = 2.4, imgAzX = 4.7, imgAzY = 3.4, imgVx = 4.7, imgVy = 4.4;
                }else if(i == 6){
                  nameAreasX = 6.4;
                  nameAreasY = 1.5;
                  t0x = 6.68, t0y =2.1;
                  tAm0x = 6.68, tAm0y = 2.6, tAz0x = 6.68, tAz0y = 3.6 ,tV0x = 6.68, tV0y = 4.6;
                  imgAx = 6.68, imgAy = 2.4, imgAzX = 6.68, imgAzY = 3.4, imgVx = 6.68, imgVy = 4.4;
                }else if(i == 7){
                  nameAreasX = 7.72;
                  nameAreasY = 1.5;
                  t0x = 8.2, t0y =2.1;
                  tAm0x = 8.09, tAm0y = 2.6, tAz0x = 8.09, tAz0y = 3.6 ,tV0x = 8.09, tV0y = 4.6;
                  imgAx = 8.07, imgAy = 2.4, imgAzX = 8.07, imgAzY = 3.4, imgVx = 8.07, imgVy = 4.4;
                }
console.log('hasta aquí llega 4');
                slideArea2.addText(arrAreaAmarillo[i].nombre, {x:nameAreasX, y:nameAreasY, font_size:18, color:'363636'})
                slideArea2.addText(datosArea[i].toFixed(1), {x:t0x, y:t0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})

                slideArea2.addImage({x:imgAx, y:imgAy, w:w, h:h,path: cAmarillo})
                slideArea2.addText(arrAreaAmarillo[i].total, {x:tAm0x, y:tAm0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})
                slideArea2.addImage({x:imgAzX, y:imgAzY, w:w, h:h,path: cAzul})
                slideArea2.addText(arrAreaAzul[i].total, {x:tAz0x, y:tAz0y  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
                slideArea2.addImage({x:imgVx, y:imgVy, w:w, h:h,path: cVerde})
                slideArea2.addText(arrAreaVerde[i].total, {x:tV0x, y:tV0y  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

      }//termina for


      for (let i = 8; i < 12; i++) {

                if(i == 8){//las variables tienen que tomar los valores del arreglo en posicion 0
                  nameAreasX = 1.6;
                  nameAreasY = 1.5;
                  t0x = 2, t0y =2.1;
                  tAm0x = 2, tAm0y = 2.6, tAz0x = 2, tAz0y = 3.6 ,tV0x = 2, tV0y = 4.6;
                  imgAx = 2, imgAy = 2.4, imgAzX = 2, imgAzY = 3.4, imgVx = 2, imgVy = 4.4;

                }else if(i == 9){
                  nameAreasX = 3.9;
                  nameAreasY = 1.5;
                  t0x = 4.69, t0y =2.1;
                  tAm0x = 4.73, tAm0y = 2.6, tAz0x = 4.73, tAz0y = 3.6 ,tV0x = 4.73, tV0y = 4.6;
                  imgAx = 4.7, imgAy = 2.4, imgAzX = 4.7, imgAzY = 3.4, imgVx = 4.7, imgVy = 4.4;
                }else if(i == 10){
                  nameAreasX = 6.4;
                  nameAreasY = 1.5;
                  t0x = 6.68, t0y =2.1;
                  tAm0x = 6.68, tAm0y = 2.6, tAz0x = 6.68, tAz0y = 3.6 ,tV0x = 6.68, tV0y = 4.6;
                  imgAx = 6.68, imgAy = 2.4, imgAzX = 6.68, imgAzY = 3.4, imgVx = 6.68, imgVy = 4.4;
                }else if(i == 11){
                  nameAreasX = 7.72;
                  nameAreasY = 1.5;
                  t0x = 8.2, t0y =2.1;
                  tAm0x = 8.09, tAm0y = 2.6, tAz0x = 8.09, tAz0y = 3.6 ,tV0x = 8.09, tV0y = 4.6;
                  imgAx = 8.07, imgAy = 2.4, imgAzX = 8.07, imgAzY = 3.4, imgVx = 8.07, imgVy = 4.4;
                }
console.log('hasta aquí llega 4');
                slideArea3.addText(arrAreaAmarillo[i].nombre, {x:nameAreasX, y:nameAreasY, font_size:18, color:'363636'})
                slideArea3.addText(datosArea[i].toFixed(1), {x:t0x, y:t0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})

                slideArea3.addImage({x:imgAx, y:imgAy, w:w, h:h,path: cAmarillo})
                slideArea3.addText(arrAreaAmarillo[i].total, {x:tAm0x, y:tAm0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})
                slideArea3.addImage({x:imgAzX, y:imgAzY, w:w, h:h,path: cAzul})
                slideArea3.addText(arrAreaAzul[i].total, {x:tAz0x, y:tAz0y  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
                slideArea3.addImage({x:imgVx, y:imgVy, w:w, h:h,path: cVerde})
                slideArea3.addText(arrAreaVerde[i].total, {x:tV0x, y:tV0y  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

      }//termina for

      for (let i = 12; i < arrAreaAmarillo.length; i++) {

                if(i == 12){//las variables tienen que tomar los valores del arreglo en posicion 0
                  nameAreasX = 1.6;
                  nameAreasY = 1.5;
                  t0x = 2, t0y =2.1;
                  tAm0x = 2, tAm0y = 2.6, tAz0x = 2, tAz0y = 3.6 ,tV0x = 2, tV0y = 4.6;
                  imgAx = 2, imgAy = 2.4, imgAzX = 2, imgAzY = 3.4, imgVx = 2, imgVy = 4.4;

                }else if(i == 13){
                  nameAreasX = 3.9;
                  nameAreasY = 1.5;
                  t0x = 4.69, t0y =2.1;
                  tAm0x = 4.73, tAm0y = 2.6, tAz0x = 4.73, tAz0y = 3.6 ,tV0x = 4.73, tV0y = 4.6;
                  imgAx = 4.7, imgAy = 2.4, imgAzX = 4.7, imgAzY = 3.4, imgVx = 4.7, imgVy = 4.4;
                }else if(i == 14){
                  nameAreasX = 6.4;
                  nameAreasY = 1.5;
                  t0x = 6.68, t0y =2.1;
                  tAm0x = 6.68, tAm0y = 2.6, tAz0x = 6.68, tAz0y = 3.6 ,tV0x = 6.68, tV0y = 4.6;
                  imgAx = 6.68, imgAy = 2.4, imgAzX = 6.68, imgAzY = 3.4, imgVx = 6.68, imgVy = 4.4;
                }else if(i == 15){
                  nameAreasX = 7.72;
                  nameAreasY = 1.5;
                  t0x = 8.2, t0y =2.1;
                  tAm0x = 8.09, tAm0y = 2.6, tAz0x = 8.09, tAz0y = 3.6 ,tV0x = 8.09, tV0y = 4.6;
                  imgAx = 8.07, imgAy = 2.4, imgAzX = 8.07, imgAzY = 3.4, imgVx = 8.07, imgVy = 4.4;
                }
console.log('hasta aquí llega 4');
                slideArea4.addText(arrAreaAmarillo[i].nombre, {x:nameAreasX, y:nameAreasY, font_size:18, color:'363636'})
                slideArea4.addText(datosArea[i].toFixed(1), {x:t0x, y:t0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})

                slideArea4.addImage({x:imgAx, y:imgAy, w:w, h:h,path: cAmarillo})
                slideArea4.addText(arrAreaAmarillo[i].total, {x:tAm0x, y:tAm0y  , font_size:18, font_face:'Arial Black', color:'FBC100'})
                slideArea4.addImage({x:imgAzX, y:imgAzY, w:w, h:h,path: cAzul})
                slideArea4.addText(arrAreaAzul[i].total, {x:tAz0x, y:tAz0y  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
                slideArea4.addImage({x:imgVx, y:imgVy, w:w, h:h,path: cVerde})
                slideArea4.addText(arrAreaVerde[i].total, {x:tV0x, y:tV0y  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

      }//termina for





    /*slideArea2.addText(arrAreaAmarillo[5].nombre, {x:3.7, y:1.5, font_size:18, color:'363636'})
    slideArea2.addText(datosArea[5].toFixed(1), {x:3.73, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:3.75, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea2.addText(arrAreaAmarillo[5].total, {x:3.77, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:3.75, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea2.addText(arrAreaAzul[5].total, {x:3.77, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea2.addImage({x:3.75, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea2.addText(arrAreaVerde[5].total, {x:3.77, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideArea2.addText(arrAreaAmarillo[6].nombre, {x:5.5, y:1.5, font_size:18, color:'363636'})
    slideArea2.addText(datosArea[6].toFixed(1), {x:5.5, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:5.48, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea2.addText(arrAreaAmarillo[6].total, {x:5.5, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:5.48, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea2.addText(arrAreaAzul[6].total, {x:5.5, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea2.addImage({x:5.48, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea2.addText(arrAreaVerde[6].total, {x:5.5, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideArea2.addText(arrAreaAmarillo[7].nombre, {x:7.2, y:1.5, font_size:18, color:'363636'})
    slideArea2.addText(datosArea[7].toFixed(1), {x:7.4, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:7.38, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea2.addText(arrAreaAmarillo[7].total, {x:7.4, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:7.38, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea2.addText(arrAreaAzul[7].total, {x:7.4, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea2.addImage({x:7.38, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea2.addText(arrAreaVerde[7].total, {x:7.4, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})*/


    slideAnt.addText('ANTIGÜEDAD', { x:4.2, y:0.5, font_size:18, color:'363636' });
    slideAnt.addText(arrAntAmarillo[0].nombre, {x:0.8, y:1.5, font_size:18, color:'363636'})
    slideAnt.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideAnt.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideAnt.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideAnt.addText(datosAnt[0].toFixed(1), {x:1.25, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:1.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideAnt.addText(arrAntAmarillo[0].total, {x:1.27, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:1.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideAnt.addText(arrAntAzul[0].total, {x:1.27, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideAnt.addImage({x:1.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideAnt.addText(arrAntVerde[0].total, {x:1.27, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideAnt.addText(arrAntAmarillo[1].nombre, {x:2.7, y:1.5, font_size:18, color:'363636'})
    slideAnt.addText(datosAnt[1].toFixed(1), {x:3.15, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:3.1, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideAnt.addText(arrAntAmarillo[1].total, {x:3.13, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:3.1, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideAnt.addText(arrGenAzul[1].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideAnt.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideAnt.addText(arrGenVerde[1].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideAnt.addText(arrAntAmarillo[2].nombre, {x:4.5, y:1.5, font_size:18, color:'363636'})
    slideAnt.addText(datosAnt[2].toFixed(1), {x:4.9, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:4.9, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideAnt.addText(arrAntAmarillo[2].total, {x:4.95, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:4.9, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideAnt.addText(arrAntAzul[2].total, {x:4.95, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideAnt.addImage({x:4.9, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideAnt.addText(arrAntVerde[2].total, {x:4.95, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideAnt.addText(arrAntAmarillo[3].nombre, {x:6.2, y:1.5, font_size:18, color:'363636'})
    slideAnt.addText(datosAnt[3].toFixed(1), {x:6.57, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:6.6, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideAnt.addText(arrAntAmarillo[3].total, {x:6.65, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideAnt.addImage({x:6.6, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideAnt.addText(arrAntAzul[3].total, {x:6.65, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideAnt.addImage({x:6.6, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideAnt.addText(arrAntVerde[3].total, {x:6.65, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slide.addText()
    pptx.save('Presentación Resultados');
    $('#modalAlert').modal('toggle');
    arrGenAmarillo.length = 0;
    arrGenAzul.length = 0;
    arrGenVerde.length = 0;
    arrIndAmarillo.length = 0;
    arrIndAzul.length = 0;
    arrIndVerde.length = 0;
    arrAreaAmarillo.length = 0;
    arrAreaAzul.length = 0;
    arrAreaVerde.length = 0;
    arrAntAmarillo.length = 0;
    arrAntAzul.length = 0;
    arrAntVerde.length = 0;
    datosGraf.length = 0;
    datosAnt.length = 0;
  }catch(exception){
  //  alert("La información no se encuentra lista, intentelo de nuevo en unos minutos")
  alert(exception)
    arrGenAmarillo.length = 0;
    arrGenAzul.length = 0;
    arrGenVerde.length = 0;
    arrIndAmarillo.length = 0;
    arrIndAzul.length = 0;
    arrIndVerde.length = 0;
    arrAreaAmarillo.length = 0;
    arrAreaAzul.length = 0;
    arrAreaVerde.length = 0;
    arrAntAmarillo.length = 0;
    arrAntAzul.length = 0;
    arrAntVerde.length = 0;
    datosGraf.length = 0;
    datosAnt.length = 0;
  }


}
