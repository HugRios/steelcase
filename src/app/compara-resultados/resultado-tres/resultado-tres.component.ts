import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Parse: any;
declare var $: any;
import Chart from 'chart.js';

var general = 0;
var grlIndustria;
var totalEncuestas = 0;
var arrayClientes = [];
var arrayAreas = [];
var arrayAnt = [];
var arrayGeneracion = [];
var fechaIngreso;
var arrayCheckAreas = [];
var empresaG, areaG, antiguedadG, generacionG, industriaG;

@Component({
  selector: 'app-resultado-tres',
  templateUrl: './resultado-tres.component.html',
  styleUrls: ['./resultado-tres.component.css']
})
export class ResultadoTresComponent implements OnInit {

  industria : string = "Nueva";
  classe3: any;
  amarillo3: any;
  azul3: any;
  verde3: any;

  constructor(private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';


    totalEncuestas = 0;

    empresaG ="";
    areaG="";
    antiguedadG="";
    generacionG="";
    industriaG="";

  }

regresaHome(){
  this.router.navigate([''])
}

nombreIndT(){
  var vector = this.getGET();
  var Industria = Parse.Object.extend("indWell");
  var query = new Parse.Query(Industria);
      query.equalTo('objectId',vector[2].id);
      query.find({
        success: function(res){
          var nombre = res[0].get("Nombre");
          var aux = nombre.toUpperCase();
        $("#nameInd3").html("BIENESTAR IND. "+ aux)
        }
      })


}


  circuloAmarilloT(): any {
    var vector = this.getGET();
    var promise = new Parse.Promise();
    var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
    var pTotal3: number = 0;

    var Industria = Parse.Object.extend("indWell");
    var industria = new Industria();
        industria.id = vector[2].id;

  	var Evaluacion = Parse.Object.extend("Wellbeing");
    var query = new Parse.Query(Evaluacion);
        query.equalTo('industria', industria);

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
        pTotal3 = ((fct + fcrt + fcr + fcrb + fcb + fclb + fcl + fclt + fceb) / 9);
        fct = (t / results.length);
        fcrt = (rt / results.length);
        fcr = (r / results.length);
        fcrb = (rb / results.length);
        fcb = (b / results.length);
        fclb = (lb / results.length);
        fcl = (l / results.length);
        fclt = (lt / results.length);
        fceb = (eb / results.length);


        var ctx = document.getElementById("myChartYellow3");
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
               max: 5,
               fontSize: 7
           }
       }
          }
        });

        var number = pTotal3;
        general += number;
        if (pTotal3.toString() == 'NaN') {
          $("#promedioTotal3").html('NA');
        } else {
          $("#promedioTotal3").html(pTotal3.toFixed(1));
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
    });

    return promise;
  }


    circuloAzulT(): any {
      var promise = new Parse.Promise();
      this.circuloAmarilloT().then((response: any) => {
        var vector = this.getGET();
        //var t=0,b=0,l=0,r=0,lt=0,lb=0,rt=0,rb=0,eb=0;
        var Industria = Parse.Object.extend("indWell");
        var industria = new Industria();
            industria.id = vector[2].id;
        //comprobarUsuario();
          var Evaluacion = Parse.Object.extend("WellCognitivo");
          var query = new Parse.Query(Evaluacion);

        query.equalTo('industria', industria);
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


            var ctx = document.getElementById("myChart3");
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
                   max: 5,
                   fontSize: 7
               }
           }
              }
            });


            //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
            var total2 = parseFloat(pTotal);
            var t2 = total2 + response;
            if (pTotal == 'NaN') {
              $("#promedioTotalAzul3").html('NA');
            } else {
              $("#promedioTotalAzul3").html(pTotal);

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

    circuloVerdeT() {
      var promise = new Parse.Promise();
      this.circuloAzulT().then((pAzul: any) => {
        var vector = this.getGET();
        var Industria = Parse.Object.extend("indWell");
        var industria = new Industria();
            industria.id = vector[2].id;
          var Evaluacion = Parse.Object.extend("WellEmocional");
          var query = new Parse.Query(Evaluacion);
        query.equalTo('industria', industria);
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






            var ctx = document.getElementById("myChartGreen3");
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
                   max: 5,
                   fontSize: 7
               }
           }
              }
            });


            totalEncuestas += totalG;
            $("#encuestas3").html("Total de encuestas: " + totalEncuestas);
            //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
            var total3 = parseFloat(pTotal);
            var t3 = total3 + pAzul;
            var final = (t3 / 3).toFixed(1);
            promise.resolve('Done');
            if (pTotal == 'NaN') {
              $("#promedioTotalVerde3").html('NA');
            } else {
              $("#promedioTotalVerde3").html(pTotal);
              $("#pgeneral3").html(final);
            }
          },
          error: function(error) {
            alert("Error: " + error.code + " " + error.message);
          }
        });

      })
      return promise;
    }



  getGET(){
    var loc = window.location.pathname;
    var getString = loc.substring(loc.lastIndexOf(':')+1);
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

  getClase(){
    var array = this.getGET();
    if(array.length == 3){
      this.classe3 = 'totales';
      this.amarillo3 = 'chartYellow';
      this.azul3 = 'chartBlue';
      this.verde3 = 'chartGreen';
    }else if(array.length == 4){
      this.classe3 = 'tresComp';
      this.amarillo3 = 'chartY3'
      this.azul3 = 'chartB3';
      this.verde3 = 'chartG3'
    }
  }

  ngOnInit() {
    this.getClase();
    this.circuloVerdeT();
    this.nombreIndT()
  }

}
