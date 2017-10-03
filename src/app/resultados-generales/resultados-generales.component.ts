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

@Component({
  selector: 'app-resultados-generales',
  templateUrl: './resultados-generales.component.html',
  styleUrls: ['./resultados-generales.component.css']
})
export class ResultadosGeneralesComponent implements OnInit {

  arregloClientes: any;
  arregloAreas = ['RH', 'Administración y finanzas', 'Operaciones', 'Logística', 'Ventas', 'Marketing', 'Dirección general', 'Otra'];
  arregloAntiguedad: any;
  arregloGeneracion: any;
  constructor( private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    this.arregloClientes = arrayClientes;
    this.arregloAreas;
    this.arregloAntiguedad = arrayAnt;
    this.arregloGeneracion = arrayGeneracion;
  }

  enviaResultados(){
    console.log("entro");
  var array = [];
  $.each($("input[name='indGrupo']:checked"), function(){
    array.push($(this).val());
  });
return array;
  }




muestraRes(){
  debugger;
  var arregloInd = this.enviaResultados();
  var industrias ="";
  for (var i = 0; i < arregloInd.length; i++) {
    industrias+=arregloInd[i]+"-";
  }
//window.location="resVarias.html?Industrias="+industrias;
this.router.navigate(['/resultados/:'+industrias]);
}


  addIndustrias() {

    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    var Industria = Parse.Object.extend("indWell");
    var query = new Parse.Query(Industria);
    query.find({
      success: function(res) {
        for (var i = 0; i < res.length; i++) {
          $("#industriasWell").append('<input type = "checkbox" name ="indGrupo" id="' + res[i].id + '" value="' + res[i].id + '"><label for="' + res[i].get("Nombre") + '">' + res[i].get("Nombre") + '</label><br>');
        }
        $("#industriasWell").append('<button (click)="enviaResultados()">' + "Mostrar" + "</button>")
      }
    })

  }

  mostrarIndustriasRes() {
    //OcultarTodo();
    if ($("#industriaR").css('display') == "none") {
      $("#industriaR").css('display', 'block');
    }
    else {
      $("#industriaR").css('display', 'none');
    }
  }


  addEmpresa() {
    var query = new Parse.Query('ClienteWell');
    query.find({
      success: function(results) {
        var list = document.createElement('li');
        for (var i = 0; i < results.length; i++) {
          arrayClientes.push(results[i].get("nombre"))
          //$("#empresasWell").append('<li>'+results[i].get("nombre")+'</li>')
          //$("#empresasWell li").attr("value", results[i].id)
        }
      }
    })


  }

  mostrarEmpresasRes() {
    if ($("#empresaR").css('display') == "none") {
      $("#empresaR").css('display', 'block');
    }
    else {
      $("#empresaR").css('display', 'none');
    }
  }

  addAntiguedad(){
  var Antiguedad = Parse.Object.extend("Antiguedad");
  var query = new Parse.Query(Antiguedad);
      query.find({
        success: function(res){
          for (var i = 0; i < res.length; i++) {
            arrayAnt.push(res[i].get("nombre"));
              //$("#antigWell").append('<li id='+res[i].id+'>'+res[i].get("nombre")+'</li>');
          }
        }
      })

  }


mostrarAreasRes(){
    if($("#areaR").css('display')=="none")
    {
        $("#areaR").css('display','block');
    }
    else{
        $("#areaR").css('display','none');
    }
}


mostrarAntiguedadRes(){
    if($("#antiguedadR").css('display')=="none")
    {
        $("#antiguedadR").css('display','block');
    }
    else{
        $("#antiguedadR").css('display','none');
    }
}

addGeneracion(){

  var Generacion = Parse.Object.extend("genWell");
  var query = new Parse.Query(Generacion);
      query.find({
        success: function(res){
          for (var i = 0; i < res.length; i++) {
            arrayGeneracion.push(res[i].get("Nombre"))
              //$("#genWell").append('<li id='+res[i].id+'>'+res[i].get("Nombre")+'</li>');
          }
        }
      })

}
mostrarGeneracionesRes(){
    if($("#generacionR").css('display')=="none")
    {
        $("#generacionR").css('display','block');
    }
    else{
        $("#generacionR").css('display','none');
    }
}



  circuloAmarillo(): any {

    var promise = new Parse.Promise();
    var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
    var pTotal: number = 0;

    var Evaluacion = Parse.Object.extend("Wellbeing");
    var query = new Parse.Query(Evaluacion);
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
          lb += object.get("jornada");
          //l+=object.get("privacy");
          l += object.get("dieta");
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
        $("#promedioTotal").html(pTotal.toFixed(1));
        console.log(number);
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


  circuloAzul(): any {
    var promise = new Parse.Promise();
    this.circuloAmarillo().then((response: any) => {
      var Evaluacion = Parse.Object.extend("WellCognitivo");
      var query = new Parse.Query(Evaluacion);
      query.find({
        success: function(results) {
          var totalB = results.length;
          var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;

          for (var i = 0; i < results.length; i++) {
            var object = results[i];
            //t+=object.get("physical");
            t += object.get("privAcustica");
            //rt+=object.get("choice");
            rt += object.get("privVisual");
            //r+=object.get("posture");
            r += object.get("estres");
            //rb+=object.get("control");
            rb += object.get("anonEstrategico");
            //b+=object.get("presence");
            b += object.get("expSelectiva");
            lb += object.get("privTerritorial");
            //l+=object.get("privacy");
            l += object.get("bloqueEst");
            //lt+=object.get("cognitive");
            lt += object.get("confidencialidad");

            eb += object.get("revitalizacion");
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
          $("#promedioTotalAzul").html(pTotal);
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
    this.circuloAzul().then((pAzul: any) => {

      var Evaluacion = Parse.Object.extend("WellEmocional");
      var query = new Parse.Query(Evaluacion);
      query.find({
        success: function(results) {
          var totalG = results.length;
          var t = 0, b = 0, l = 0, r = 0, lt = 0, lb = 0, rt = 0, rb = 0, eb = 0;
          for (var i = 0; i < results.length; i++) {
            var object = results[i];

            //t+=object.get("physical");
            t += object.get("pertenencia");
            //rt+=object.get("choice");
            rt += object.get("conectarseOtros");
            //r+=object.get("posture");
            r += object.get("interaccionSocial");
            //rb+=object.get("control");
            rb += object.get("confianza");
            //b+=object.get("presence");
            b += object.get("inovacion");
            lb += object.get("trabajoEquipo");
            //l+=object.get("privacy");
            l += object.get("resProblemas");
            //lt+=object.get("cognitive");
            lt += object.get("pertenencia");

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
          var t3 = total3 + pAzul;
          var final = (t3 / 3).toFixed(1);
          console.log(final);
          if (pTotal == 'NaN') {
            $("#promedioTotalVerde").html(0);
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

  ngOnInit() {
    this.circuloVerde();
    this.addIndustrias();
    this.addEmpresa();
    this.addAntiguedad();
    this.addGeneracion();
  }


}
