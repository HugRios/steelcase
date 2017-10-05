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
  selector: 'app-resultado-uno',
  templateUrl: './resultado-uno.component.html',
  styleUrls: ['./resultado-uno.component.css']
})
export class ResultadoUnoComponent implements OnInit {

  industria : string = "Nueva";
  arregloClientes: any;
  arregloAreas : any;
  arregloAntiguedad: any;
  arregloGeneracion: any;
  constructor(private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    this.arregloClientes = arrayClientes;
    this.arregloAreas;
    this.arregloAntiguedad = arrayAnt;
    this.arregloGeneracion = arrayGeneracion;
    this.arregloAreas = arrayAreas;

    totalEncuestas = 0;

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

nombreInd(){
  var url = window.location.pathname;
  industriaG = url.substring(url.indexOf(":")+1, url.length-1);
  var Industria = Parse.Object.extend("indWell");
  var query = new Parse.Query(Industria);
      query.find({
        success: function(res){
          var nombre = res[0].get("Nombre");
          var aux = nombre.toUpperCase();
        $("#nameInd").html("BIENESTAR IND. "+ aux)
        }
      })


}


  addEmpresa() {
    var url = window.location.pathname;
    var id = url.substring(url.indexOf(":")+1, url.length-1);

    var Industria = Parse.Object.extend("indWell");
    var industria = new Industria();
        industria.id = id;
    var query = new Parse.Query('ClienteWell');
    query.equalTo("Industria", industria);
    query.find({
      success: function(results) {
        var list = document.createElement('li');
        for (var i = 0; i < results.length; i++) {
          arrayClientes.push({nombre:results[i].get("nombre"), id: results[i].id})
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
            arrayAnt.push({nombre: res[i].get("nombre"), id: res[i].id});
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
            arrayGeneracion.push({nombre:res[i].get("Nombre"), id: res[i].id})
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


mostrarOpciones(){
    if($("#options").css('display')=="none")
    {
        $("#options").css('display','block');
    }
    else{
        //$("#industriaDD").css('display','none');
    }
}


filtraCliente(ide: any){
this.OcultarTodo();

  arrayAreas.length = 0;
  empresaG = ide;
  var Cliente = Parse.Object.extend("ClienteWell");
  var cliente = new Cliente();
      cliente.id = ide;
      $("#empresaP").html(cliente.get("nombre"));
  var query = new Parse.Query("areaWell");
      query.exists("cliente")
      query.equalTo("cliente", cliente);
      query.find({
        success: function(res){
          for (let i = 0; i < res.length; i++) {

            arrayAreas.push({nombre:res[i].get("Name"), id: res[i].id})
          }
        }
      })

  //alert("pus si funciona")
}

filtroArea(ide: any){
  areaG = ide;
  console.log(ide)
  this.OcultarTodo();
  var Area = Parse.Object.extend("areaWell");
  var area = new Area();
      area.id = ide;
      $("#areaP").html(area.get("Name"));
}

filtroAntiguedad(ide: any){
  antiguedadG = ide;
  this.OcultarTodo();
  var Antiguedad = Parse.Object.extend("Antiguedad");
  var antiguedad = new Antiguedad();
      antiguedad.id = ide;
      $("#antiguedadP").html(antiguedad.get("nombre"));
}

filtroGeneracion(ide: any){
  generacionG = ide;
  this.OcultarTodo();
  var Generacion = Parse.Object.extend("genWell");
  var generacion = new Generacion();
      generacion.id = ide;
      $("#generacionP").html(generacion.get("Nombre"));
}

showResults(){
  this.router.navigate(['/resultadosFiltro/:'+"Empresa="+empresaG+"&"+"Area="+areaG+"&"+"Generacion="+generacionG+"&"+"Antiguedad="+antiguedadG+"&Industria="+industriaG]);
}

OcultarTodo(){
    $("#industriaDD").css('display','none');
    $("#clienteDD").css('display','none');
    $("#periodoDD").css('display','none');
    $("#areaDD").css('display','none');
    $("#generacionDD").css('display','none');
    $("#options").css('display','none');
    $("#antiguedad").css('display','none');
    $("#areaD").css('display','none');
    $("#generacionD").css('display','none');
    $("#industriaD").css('display','none');
      $("#results").css('display','none');
      $("#industriaR").css('display','none');
      $("#empresaR").css('display','none');
      $("#areaR").css('display','none');
      $("#antiguedadR").css('display','none');
      $('#generacionR').css('display','none')
}



  circuloAmarillo(): any {
    var url = window.location.pathname;
    var id = url.substring(url.indexOf(":")+1, url.length-1);
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
      var url = window.location.pathname;
      var id = url.substring(url.indexOf(":")+1, url.length-1)
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

      var url = window.location.pathname;
      var id = url.substring(url.indexOf(":")+1, url.length-1)

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
    arrayClientes.length = 0;
    arrayGeneracion.length = 0;
    arrayAnt.length = 0;
    this.circuloVerde();
    this.addIndustrias();
    this.addEmpresa();
    this.addAntiguedad();
    this.addGeneracion();
    this.nombreInd()
  }

}
