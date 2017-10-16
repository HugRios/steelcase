import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare var Parse: any;
declare var $: any;
import Chart from 'chart.js';
var general = 0;
var totalEncuestas = 0;

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
           console.log(get);
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
                    $("#showClient").show('fast');
                       $("#clienteName").val(res[0].get("nombre"));
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
                    console.log(res[0].get("nombre"))
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
         console.log("entra aqui");
         query.equalTo("cliente", cliente);
       }

       if(vector[1].id == ""){
         query.exists("area")
       }else{
         var id = vector[1].id ;
         var area = Parse.Object.extend("areaWell");
         var area = new area();
             area.id = id;
         console.log("entra aqui area");
         query.equalTo("area", area);
       }

       if(vector[2].id == ""){
         query.exists("generacion")
       }else{
         var id = vector[2].id ;
         var Generacion = Parse.Object.extend("genWell");
         var generacion = new Generacion();
             generacion.id = id;
         console.log("entra aqui area");
         query.equalTo("generacion", generacion);
       }

       if(vector[3].id == ""){
         query.exists("antiguedad")
       }else{
         var id = vector[3].id ;
         var Antiguedad = Parse.Object.extend("Antiguedad");
         var antiguedad = new Antiguedad();
             antiguedad.id = id;
         console.log("entra aqui antiguedad");
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


         console.log("entra aqui");
         query.equalTo("cliente", cliente);
       }

       if(vector[1].id == ""){
         query.exists("area")
       }else{
         var id = vector[1].id ;
         var area = Parse.Object.extend("areaWell");
         var area = new area();
             area.id = id;
         console.log("entra aqui area");
         query.equalTo("area", area);
       }

       if(vector[2].id == ""){
         query.exists("generacion")
       }else{
         var id = vector[2].id ;
         var Generacion = Parse.Object.extend("genWell");
         var generacion = new Generacion();
             generacion.id = id;
         console.log("entra aqui area");
         query.equalTo("generacion", generacion);
       }

       if(vector[3].id == ""){
         query.exists("antiguedad")
       }else{
         var id = vector[3].id ;
         var Antiguedad = Parse.Object.extend("Antiguedad");
         var antiguedad = new Antiguedad();
             antiguedad.id = id;
         console.log("entra aqui antiguedad");
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
           var t3 = total3 + pAzul;
           var final = (t3 / 3).toFixed(1);
           console.log(final);
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

  ngOnInit() {
    this.circuloVerde();
    this.regresaInd();
    this.datosCliente();
  }


}
