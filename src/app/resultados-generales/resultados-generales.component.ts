import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
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

@Component({
  selector: 'app-resultados-generales',
  templateUrl: './resultados-generales.component.html',
  styleUrls: ['./resultados-generales.component.css']
})
export class ResultadosGeneralesComponent implements OnInit {

  industria : boolean = false;
  filtros : boolean;
  arregloClientes: any;
  arregloAreas = ['RH', 'Administración y finanzas', 'Operaciones', 'Logística', 'Ventas', 'Marketing', 'Dirección general', 'Otra'];
  arregloAntiguedad: any;
  arregloGeneracion: any;
  public myDatePickerOptions: IMyDpOptions = {
  // other options...
  dateFormat: 'dd/mm/yyyy',
  height: '25px',
  editableDateField: false
};

// Initialized to specific date (09.10.2018).
public model = { date: { year: 2018, month: 10, day: 9 } };
public modelIngreso = { year: 2018, month: 10, day: 9 };


  constructor( private router : Router) {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    this.arregloClientes = arrayClientes;
    this.arregloAreas;
    this.arregloAntiguedad = arrayAnt;
    this.arregloGeneracion = arrayGeneracion;
    totalEncuestas = 0;
    this.filtros = false
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
  var arregloInd = this.enviaResultados();
  var industrias ="";
  for (var i = 0; i < arregloInd.length; i++) {
    industrias+=arregloInd[i]+",";
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


mostrarOpciones(){
    if($("#options").css('display')=="none")
    {
        $("#options").css('display','block');
    }
    else{
        //$("#industriaDD").css('display','none');
    }
}

OcultarPopUp(tipo){

$('input[type=checkbox]').prop('checked', false);
$('#link').val("");
$('#newCliente').val("");
    this.OcultarTodo();
$('#linkWell').css('display','none');

  if(tipo == "wellbeing"){
$("#genPop").hide();
$("#agregaArea").hide();
$("#venPop").hide();
$("#cuestionario").hide();
$("#encWell").show();


    if($("#popup").css('display')=="none")
    {
        $("#popup").css('display','block');
          $('#linkWell').css('display','block');
    }
    else{
        $("#popup").css('display','none');
    }

  }else{
    $("#genPop").show();
    $("#areasPop").show();
    $("#indPop").show();
    $("#clPop").show();
    $("#venPop").show();
    $("#cuestionario").show();
    $("#encWell").hide();
    if($("#popup").css('display')=="none")
    {
        $("#popup").css('display','block');
          $("#crearLink").css('display','block');
    }
    else{
        $("#popup").css('display','none');
    }
  }

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


addArea(){
  $("#agregaArea").show();
}



areasLink(){
  Parse.initialize("steelcaseCirclesAppId");
  Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

  var Industria = Parse.Object.extend("indWell");
  var query = new Parse.Query(Industria);
      query.find({
        success: function(res){
          for (var i = 0; i < res.length; i++) {
            $("#industriasWellNew").append($("<option></option>")
                          .attr("value",res[i].get("Nombre"))
                          .text(res[i].get("Nombre")));
          }
          $("#industriasWellNew").append($("<option></option>")
                        .attr("value","Otro")
                        .text("Otro"));
        }
      })
}

obtenIngreso(event: any) {
  //console.log('onInputFieldChanged(): Value: ', event.value, ' - dateFormat: ', event.dateFormat, ' - valid: ', event.valid);
  var date = new Date(event.value);
  fechaIngreso = new Date(event.date.month + "/" + event.date.day + "/" + event.date.year);
  //console.log(date);
}

verificarInd(){

  if($("#industriasWellNew").val() == "Otro"){
    $("#newIndustria").show();
    return true;
  }else{
    $("#newIndustria").hide();
  }
}

verifica(){

    var str =  $("#nuevaArea").val();
    if (!/^([A-Z\ a-z\ ñ\ Ñ\ ,\ ])*$/.test(str)){
      alert("el formato para agregar areas es: area, area2, area3")
      return false;
    }else{
      return true
    }

}

verificaEmpleados(){

    console.log("dfdf");
    var str = $("#noEmpleados").val();
    if(!/^([0-9])*$/.test(str)){
      alert("Sólo puedes ingresar valores numéricos");
      $("#noEmpleados").val('');
    }

}

getAreas(){
  if(this.verifica() == true){
    var arrayCheckbox = [];
    $.each($("input[name='user_group[]']:checked"), function() {
    arrayCheckbox.push($(this).val());
  });

  if($("#nuevaArea").val() !== ''){

      var areas = $("#nuevaArea").val();
      var arrayArea = areas.split(",");
      for (var i = 0; i < arrayArea.length; i++) {
        arrayCheckbox.push(arrayArea[i])
      }
  }
return arrayCheckbox;
}

}






generarWell(){ //genera link por cliente

  arrayCheckAreas = this.getAreas();

  var customerName =$("#newCliente").val();
  var auxEmpleados =$("#noEmpleados").val();
  var noEmpleados = parseInt($("#noEmpleados").val());
  var industria = $("#industriasWellNew").val();
  var newInd =  $("#newIndustria").val();
  console.log(industria);
  var fecha = fechaIngreso;
  var link = "https://hugrios.bitbucket.io/inicio.html";
  var date = new Date(fecha);
  console.log(date);
  date.setHours(date.getHours()+23);
  date.setMinutes(date.getMinutes()+59);
  console.log(date);
try {
  if(arrayCheckAreas.length != 0 && customerName != '' && industria !='' && auxEmpleados != '' ){


    var cliente = Parse.Object.extend('ClienteWell');
    var newCliente = new cliente();

    var Link = Parse.Object.extend("LinksWell");
    var newLink = new Link();


    var Industria = Parse.Object.extend('indWell');
    var newIndustria = new Industria();
    var query = new Parse.Query(Industria);
      query.equalTo("Nombre", industria);
      query.find({
        success: function(res){
          if(res.length == 0){// si no encuentra resultados para la industria se debe agregar un nueva
            newIndustria.set("Nombre", newInd);
            newIndustria.save(null,{
              success: function(newIndustria){
                newCliente.set("nombre",customerName);
                newCliente.set("noEmpleados", noEmpleados);
                newCliente.set("Industria", newIndustria);
                newCliente.save(null,{
                  success: function(newCliente){
                    for (var i = 0; i < arrayCheckAreas.length; i++) {
                      var areas = Parse.Object.extend('areaWell');
                      var newAreas = new areas();
                      newAreas.set('cliente', newCliente);
                      newAreas.set('Name', arrayCheckAreas[i]);
                      newAreas.save();
                      console.log(i)
        //termina creación areas con cliente
                    }
                    newLink.set("cliente", newCliente);
                    newLink.set("link", link+"?Cliente="+newCliente.id+"&Industria="+newIndustria.id);
                    newLink.set("fechaLimite", date);
                    newLink.save();
                    $("#link").val("https://hugrios.bitbucket.io/inicio.html"+"?Cliente="+newCliente.id+"&Industria="+newIndustria.id);
                  }//
                })//termina creación del cliente
              }
            })


          }else{
            newCliente.set("nombre",customerName);
            newCliente.set("noEmpleados", noEmpleados);
            newCliente.set("Industria", res[0]);
            newCliente.save(null,{
              success: function(newCliente){
                for (var i = 0; i < arrayCheckAreas.length; i++) {
                  var areas = Parse.Object.extend('areaWell');
                  var newAreas = new areas();
                  newAreas.set('cliente', newCliente);
                  newAreas.set('Name', arrayCheckAreas[i]);
                  newAreas.save();
                  console.log(i)
    //termina creación areas con cliente
                }
                newLink.set("cliente", newCliente);
                newLink.set("link", link+"?Cliente="+newCliente.id+"&Industria="+res[0].id);
                newLink.set("fechaLimite", date);
                newLink.save();
                $("#link").val("https://hugrios.bitbucket.io/inicio.html"+"?Cliente="+newCliente.id+"&Industria="+res[0].id);
              }//
            })//termina creación del cliente
          }
        }
      })
  }else{
    alert("Recuerda: debes selecionar industría, área y agregar un cliente para continuar")
  }

} catch (e) {
  console.log("error"+e)
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
    this.areasLink();
  }


}
