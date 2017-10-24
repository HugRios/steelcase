import { Component, OnInit, Output, EventEmitter  } from '@angular/core';
import { Router } from '@angular/router';
declare var Parse: any;
declare var $: any;
import Chart from 'chart.js';

var general2 = 0;
var grlIndustria2;
var totalEncuestas2 = 0;
var arrayClientes2 = [];
var arrayAreas = [];
var arrayAnt = [];
var arrayGeneracion = [];
var fechaIngreso;
var arrayCheckAreas = [];
var empresaG, areaG, antiguedadG, generacionG, industriaG;
var arrayTotales = [];
var nombreInd;
var TotalesVerde = [];
@Component({
  selector: 'app-resultado-tres',
  templateUrl: './resultado-tres.component.html',
  styleUrls: ['./resultado-tres.component.css']
})
export class ResultadoTresComponent implements OnInit {
//@Output() termine = new EventEmitter();
  industria : string = "Nueva";
  arregloClientes: any;
  arregloAreas : any;
  arregloAntiguedad: any;
  arregloGeneracion: any;
  done: boolean = false;
  promTotal = 0;
  totalAmarillo = 0;
  totalVerde = 0;
  totalAzul = 0;
  totalEnc : any ;
  industriaName : string = 'rtrtrt';
  constructor(private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    this.arregloClientes = arrayClientes2;
    this.arregloAreas;
    this.arregloAntiguedad = arrayAnt;
    this.arregloGeneracion = arrayGeneracion;
    this.arregloAreas = arrayAreas;
    this.industriaName = nombreInd;
    totalEncuestas2 = 0;

    empresaG ="";
    areaG="";
    antiguedadG="";
    generacionG="";
    industriaG="";

  }



  addIndustrias() {

    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

}

regresaHome(){
  console.log("si estoy");
  this.router.navigate(['/home'])
}





  circuloAmarilloTres(): any {
    var url = window.location.pathname;
    var id = url.substring(url.indexOf(",")+1, url.length-1);
    var promise = new Parse.Promise();
    var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
    var pTotal: number = 0;

    var Industria = Parse.Object.extend("indWell");
    var industria = new Industria();
        industria.id = id;

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
        general2 += number;
        arrayTotales.push(pTotal.toFixed(1));
        //$("#promedioTotal").html(pTotal.toFixed(1));
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


  circuloAzulTres(): any {
    debugger
    var promise = new Parse.Promise();
    this.circuloAmarilloTres().then((response: any) => {
      var url = window.location.pathname;
      var id = url.substring(url.indexOf(",")+1, url.length-1);
      console.log(id);
      //var t=0,b=0,l=0,r=0,lt=0,lb=0,rt=0,rb=0,eb=0;
      var Industria = Parse.Object.extend("indWell");
      var industria = new Industria();
          industria.id = id;
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
          arrayTotales.push(pTotal);
          //$("#promedioTotalAzul").html(pTotal);
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

  circuloVerdeTres() {
    var promise = new Parse.Promise();

    this.circuloAzulTres().then((pAzul: any) => {

      var url = window.location.pathname;
      var id = url.substring(url.indexOf(",")+1, url.length-1);

      var Industria = Parse.Object.extend("indWell");
      var industria = new Industria();
          industria.id = id;
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


          totalEncuestas2 += totalG;
        //  $("#encuestas").html("Total de encuestas: " + totalEncuestas2);
          //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
          var total3 = parseFloat(pTotal);
          var t3 = total3 + pAzul;
          var final = (t3 / 3).toFixed(1);

          if (pTotal == 'NaN') {
            //$("#promedioTotalVerde").html(0);
            TotalesVerde.push({total: 'NA', totalF: final, encuestas: totalEncuestas2});
            promise.resolve(TotalesVerde);
          } else {
              TotalesVerde.push({total: pTotal, totalF: final, encuestas: totalEncuestas2});
              promise.resolve(TotalesVerde);
            //$("#promedioTotalVerde").html(pTotal);
            //$("#pgeneralTres").html(final);
          }


        },
        error: function(error) {
          alert("Error: " + error.code + " " + error.message);
        }
      });

    })
    return promise
  }


  nombreIndTres(){
    var promise = new Parse.Promise();
      this.circuloVerdeTres().then((response: any) =>{
        var url = window.location.pathname;
        var id = url.substring(url.indexOf(",")+1, url.length-1);
        var Industria = Parse.Object.extend("indWell");
        var query = new Parse.Query(Industria);
            query.equalTo('objectId',id )
            query.find({
              success: function(res){
                var nombre = res[0].get("Nombre");
                var aux = nombre.toUpperCase();
                console.log(aux)
              nombreInd = "BIENESTAR IND. "+ aux;
              promise.resolve(nombreInd);
              }
            })
      })
      return promise
  }



  ngOnInit() {
    arrayTotales.length = 0;
    arrayClientes2.length = 0;
    arrayGeneracion.length = 0;
    arrayAnt.length = 0;
    setTimeout(()=>    this.nombreIndTres().then((response: any) =>{
          console.log(response[0].total);
          this.totalAmarillo = arrayTotales[0];
          this.totalAzul  = arrayTotales[1];
          this.totalVerde = TotalesVerde[0].total;//response[0].total;
          this.promTotal = TotalesVerde[0].totalF;//response[0].totalF;
          this.totalEnc = TotalesVerde[0].encuestas;
          //this.addIndustrias();
          this.nombreIndTres()
          this.industriaName = response;
          this.done = true;
            
        }) , 9000);
  }

}