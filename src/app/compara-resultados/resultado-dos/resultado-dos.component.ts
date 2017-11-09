import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
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
  selector: 'app-resultado-dos',
  templateUrl: './resultado-dos.component.html',
  styleUrls: ['./resultado-dos.component.css']
})
export class ResultadoDosComponent implements OnInit {

@Output() avisoTermine2 = new EventEmitter();

public termine2: boolean = false;
  industria : string = "Nueva";
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
  console.log("si estoy");
  this.router.navigate([''])
}

nombreIndS(){
  var vector = this.getGET();
  var Industria = Parse.Object.extend("indWell");
  var query = new Parse.Query(Industria);
      query.equalTo('objectId',vector[1].id)
      query.find({
        success: function(res){
          var nombre = res[0].get("Nombre");
          var aux = nombre.toUpperCase();
        $("#nameInd2").html("BIENESTAR IND. "+ aux)
        }
      })


}


  circuloAmarilloS(): any {
    var vector = this.getGET();
    console.log(vector);
    var promise = new Parse.Promise();
    var t2 = 0, b2 = 0, l2 = 0, r2 = 0, lt2 = 0, lb2 = 0, rt2 = 0, rb2 = 0, eb2 = 0;
    var pTotal2: number = 0;

    var Industria = Parse.Object.extend("indWell");
    var industria = new Industria();
        industria.id = vector[1].id;

  	var Evaluacion = Parse.Object.extend("Wellbeing");
    var query = new Parse.Query(Evaluacion);
        query.equalTo('industria', industria);

    query.find({
      success: function(results) {
        var totalA = results.length;
        for (var i = 0; i < results.length; i++) {
          var object = results[i];

                    //t+=object.get("physical");
                    t2 += object.get("postura");
                    //rt+=object.get("choice");
                    rt2 += object.get("movimiento");
                    //r+=object.get("posture");
                    r2 += object.get("temperatura");
                    //rb+=object.get("control");
                    rb2 += object.get("peso");
                    //b+=object.get("presence");
                    b2 += object.get("ergonomia");
                    lb2 += object.get("cargaTrabajo");//cambiar nueva encuesta carga de trabajo
                    //l+=object.get("privacy");
                    l2 += object.get("vitalidad");//cambiar nueva encuesta vitalidad
                    //lt+=object.get("cognitive");
                    lt2 += object.get("luz");

                    eb2 += object.get("contactoexterior");
        }

        var fct2 = t2 / results.length;
        var fcrt2 = rt2 / results.length;
        var fcr2 = r2 / results.length;
        var fcrb2 = rb2 / results.length;
        var fcb2 = b2 / results.length;
        var fclb2 = lb2 / results.length;
        var fcl2 = l2 / results.length;
        var fclt2 = lt2 / results.length;
        var fceb2 = eb2 / results.length;
        pTotal2 = ((fct2 + fcrt2 + fcr2 + fcrb2 + fcb2 + fclb2 + fcl2 + fclt2 + fceb2) / 9);
        fct2 = (t2 / results.length);
        fcrt2 = (rt2 / results.length);
        fcr2 = (r2 / results.length);
        fcrb2 = (rb2 / results.length);
        fcb2 = (b2 / results.length);
        fclb2 = (lb2 / results.length);
        fcl2 = (l2 / results.length);
        fclt2 = (lt2 / results.length);
        fceb2 = (eb2 / results.length);


        /*var ctx = document.getElementById("myChartYellow");
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
        });*/

        var number = pTotal2;
        general += number;
        if (pTotal2.toString() == 'NaN') {
          $("#promedioTotal2").html('NA');
        } else {
          $("#promedioTotal2").html(pTotal2.toFixed(1));
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

  circuloAzulS(): any {
    var promise = new Parse.Promise();
    this.circuloAmarilloS().then((response: any) => {
      var vector = this.getGET();
      //var t=0,b=0,l=0,r=0,lt=0,lb=0,rt=0,rb=0,eb=0;
      var Industria = Parse.Object.extend("indWell");
      var industria = new Industria();
          industria.id = vector[1].id;
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


          /*var ctx = document.getElementById("myChart");
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
          });*/


          //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
          var total2 = parseFloat(pTotal);
          var t2 = total2 + response;

          if (pTotal == 'NaN') {
            $("#promedioTotalAzul2").html('NA');
          } else {
            $("#promedioTotalAzul2").html(pTotal);

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

  circuloVerdeS() {
    var promise = new Parse.Promise();
    this.circuloAzulS().then((pAzul: any) => {
      var vector = this.getGET();
      var Industria = Parse.Object.extend("indWell");
      var industria = new Industria();
          industria.id = vector[1].id;
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






          /*var ctx = document.getElementById("myChartGreen");
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
          });*/


          totalEncuestas += totalG;
          $("#encuestas2").html("Total de encuestas: " + totalEncuestas);
          //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
          var total3 = parseFloat(pTotal);
          var t3 = total3 + pAzul;
          var final = (t3 / 3).toFixed(1);
          promise.resolve('Done');
          if (pTotal == 'NaN') {
            $("#promedioTotalVerde2").html('NA');
          } else {
            $("#promedioTotalVerde2").html(pTotal);
            $("#pgeneral2").html(final);
          }
        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });

    })
    return promise;
  }


getDatas(){
  this.circuloVerdeS().then((response: any) =>{
    this.termine2 = true;
    this.eventoPrueba();
  })
}

eventoPrueba(){
  this.avisoTermine2.emit(this.termine2);
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

  ngOnInit() {
    this.getDatas();
    this.nombreIndS()
  }

}
