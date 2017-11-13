import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';
//import * as pptxgenjs from 'pptxgenjs';
import * as html2canvas from "html2canvas"
declare var Canvas2Image : any;
declare var require : any;
declare var Parse: any;
declare var $: any;
declare var PptxGenJS : any;
import Chart from 'chart.js';

var general = 0;
var grlIndustria;
var totalEncuestas = 0;
var arrayClientes = [];
var arrayAreas = [];
var arrayAnt = [];
var arrayAreasWell = [];
var arrayGeneracion = [];
var fechaIngreso;
var arrayCheckAreas = [];
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
var empresaG, areaG, antiguedadG, generacionG, industriaG;
var amarillo = 0, azul= 0, verde = 0;
var idEliminar;

@Component({
  selector: 'app-resultados-generales',
  templateUrl: './resultados-generales.component.html',
  styleUrls: ['./resultados-generales.component.css']
})
export class ResultadosGeneralesComponent implements OnInit {

  industria : string = "Nueva";
  filtros : boolean;
  arregloClientes: any;
  arregloAreas : any;
  arregloAntiguedad: any;
  arregloGeneracion: any;
  arregloAreasWell: any;
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
    this.arregloAreas = arrayAreas;
    this.arregloAntiguedad = arrayAnt;
    this.arregloGeneracion = arrayGeneracion;
    this.arregloAreasWell  = arrayAreasWell;
    totalEncuestas = 0;
    this.filtros = false;

    empresaG ="";
    areaG="";
    antiguedadG="";
    generacionG="";
    industriaG="";

  }

/*Nombre: enviaResultados
  Input: none
  Output: array
Devuelve un array que contiene lo id´s de las
industrias seleccionadas por el usuario para mostrar
los resultados*/
  enviaResultados(){

  var array = [];
  $.each($("input[name='indGrupo']:checked"), function(){
    if($(this).val() != 'undefined')
    array.push($(this).val());
  });
return array;
  }

/*Nombre: muestraRes
  Input: none
  Output: none
  Funcion que extrae del array arregloInd los
  id´s de las industrias seleccionadas para posteriormente redirgir
  a ese componente.*/
muestraRes(){
  var arregloInd = this.enviaResultados();
  var industrias ="C0=";
  for (var i = 0; i < arregloInd.length; i++) {
    industrias+=arregloInd[i]+"&C"+(i+1)+"=";
  }
this.router.navigate(['/resultados/:'+industrias]);
}

/*Nombre: addIndustrias, mostrarIndustriasRes
  Input: none
  Output: none
Función que obtiene de la BD la información de las industrías dadas de alta
para poder mostrarlas al usuario. La siguiente función permite visualizar en el DOM
la lista de industrías*/
  addIndustrias() {
    Parse.initialize("steelcaseCirclesAppId");
    Parse.serverURL = 'https://steelcase-circles.herokuapp.com/parse';

    var Industria = Parse.Object.extend("indWell");
    var query = new Parse.Query(Industria);
    query.find({
      success: function(res) {
        for (var i = 0; i < res.length; i++) {
          arrayIndustrias.push({nombre: res[i].get('Nombre'), id: res[i].id})
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
    query.ascending("nombre");
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
            arrayAnt.push({nombre: res[i].get("nombre"), id: res[i].id, orden: res[i].get('orden')});
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
            arrayGeneracion.push({nombre:res[i].get("Nombre"), id: res[i].id, orden: res[i].get("orden")})
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
$("#noEmpleados").val("");

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
    var myId = $(this).attr('id');
    arrayCheckbox.push({nombre:$(this).val(), id:myId});
  });

  if($("#nuevaArea").val() !== ''){

      var areas = $("#nuevaArea").val();
      var arrayArea = areas.split(",");
      for (var i = 0; i < arrayArea.length; i++) {
      arrayCheckbox.push({nombre:arrayArea[i], id: 'none'})
      }
  }
return arrayCheckbox;
}

}

getIdAreas(){
  var query = new Parse.Query('areaWell');
      query.doesNotExist('cliente');
      query.find({
        success: function(res){
          for (let i = 0; i < res.length; i++) {
            arrayAreasWell.push({nombre: res[i].get('Name'), id: res[i].id})
          }
        }
      })
}



filtraCliente(ide: any){
  this.OcultarTodo();
  empresaG = ide;
  var Cliente = Parse.Object.extend("ClienteWell");
  var cliente = new Cliente();
      cliente.id = ide;
      $("#empresaP").html(cliente.get("nombre"));

}

/* Funciones para eliminar a un cliente*/
elimina(id){
  idEliminar = id;
  $('#modalEliminar').modal('toggle');
}

cancelaElim(){
  idEliminar = '';
  $('#modalEliminar').modal('hide');
}

eliminaCliente(){
  console.log(idEliminar);
  var arrayEliminar = [];
  var Cliente = Parse.Object.extend('ClienteWell');
  var cliente = new Cliente();
      cliente.id = idEliminar;
  var queryYellow = new Parse.Query('Wellbeing');
      queryYellow.equalTo('cliente', cliente);
      queryYellow.find({
        success: function(resYellow){
          for (let i = 0; i < resYellow.length; i++) {
              resYellow[i].destroy({});
              console.log('el objeto se destruyó')
          }
          var queryBlue = new Parse.Query('WellCognitivo');
              queryBlue.equalTo('cliente', cliente);
              queryBlue.find({
                success: function(resBlue){
                  for (let i = 0; i < resBlue.length; i++) {
                      resBlue[i].destroy({});
                      console.log('azul destruido')
                  }
                  var queryGreen = new Parse.Query('WellEmocional');
                      queryGreen.equalTo('cliente', cliente);
                      queryGreen.find({
                        success: function(resGreen){
                          for (let i = 0; i < resGreen.length; i++) {
                              resGreen[i].destroy({});
                              console.log('verde destruido')
                          }
                          var queryAreas = new Parse.Query('areaWell');
                              queryAreas.equalTo('cliente', cliente);
                              queryAreas.find({
                                success: function(resAreas){
                                  for (let i = 0; i < resAreas.length; i++) {
                                      resAreas[i].destroy({});
                                      console.log('areasDestruido')
                                  }
                                  var queryLink = new Parse.Query('LinksWell');
                                      queryLink.equalTo('cliente', cliente);
                                      queryLink.find({
                                        success: function(resLink){
                                          resLink[0].destroy({});
                                          console.log('Link destruido');
                                          var queryCliente = new Parse.Query('ClienteWell');
                                              queryCliente.equalTo('objectId', idEliminar);
                                              queryCliente.find({
                                                success: function(resCliente){
                                                  resCliente[0].destroy({});
                                                  console.log('Cliente destruido');
                                                }
                                              })
                                        }
                                      })
                                }
                              })
                        }
                      })
                }
              })
        }
      })
        $('#modalEliminar').modal('hide');
        $('#'+idEliminar).remove();
}

/*filtroArea(ide: any){
  areaG = ide;
  this.OcultarTodo();
  var Area = Parse.Object.extend("areaWell");
  var query = new Parse.Query(Area);
      query.
  var area = new Area();
      area.id = ide;
      $("#areaP").html(area.get("Name"));
}*/


filtroAntiguedad(ide: any){
  antiguedadG = ide;
  console.log(antiguedadG)
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
  var arreglo = this.enviaResultados();
  var industria = '';
  if(arreglo.length > 1){
    alert("Si deseas hacer uso de los filtros solo puedes seleccionar una área")
  }else{
    if(arreglo.length != 0){
      industria = arreglo[0];
    }
    if(empresaG == '' && areaG =='' && generacionG == '' && antiguedadG =='' && industria ==''){
      alert('No existen filtros para la búsqueda');
    }else{
      this.router.navigate(['/resultadosFiltro/:'+"Empresa="+empresaG+"&"+"Area="+areaG+"&"+"Generacion="+generacionG+"&"+"Antiguedad="+antiguedadG+"&Industria="+industria]);

    }
  }

}



validaInd(){
  var existe = false;
  var newInd =  $("#newIndustria").val();
  var industria = $("#industriasWellNew").val();
  if(newInd != ''){
    var queryInd = new Parse.Query('indWell');
        queryInd.equalTo('Nombre', newInd);
        queryInd.find({
          success: function(resInd){
            if(resInd.length != 0){
              alert('La industria que desas crear ya existe.')
            }else{
                existe = true;
            }
          }
        })
  }else if(industria !='Otro'){
    existe = true;
  }

      return existe;
}

generarWell(){ //genera link por cliente

  var existe = this.validaInd();
  arrayCheckAreas = this.getAreas();
  var areasLink = "";
  var customerName =$("#newCliente").val();
  var auxEmpleados =$("#noEmpleados").val();
  var noEmpleados = parseInt($("#noEmpleados").val());
  var industria = $("#industriasWellNew").val();
  var newInd =  $("#newIndustria").val();
  var fecha = fechaIngreso;
  var link = "https://steelcasemx-wellbeingsurvey.com";
  var date = new Date(fecha);
  date.setHours(date.getHours()+23);
  date.setMinutes(date.getMinutes()+59);

if(existe == true){

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
                        if(arrayCheckAreas[i].id == 'none'){
                          var areas = Parse.Object.extend('areaWell');
                          var newAreas = new areas();
                          newAreas.set('cliente', newCliente);
                          newAreas.set('Name', arrayCheckAreas[i].nombre);
                          newAreas.save(null,{
                            success: function(newAreas){
                              areasLink += newAreas.id+"-";
                            }
                          });
                        }else{
                              areasLink += arrayCheckAreas[i].id+"-";
                        }

          //termina creación areas con cliente
                      }
                      newLink.set("cliente", newCliente);
                      newLink.set("areas", arrayCheckAreas);
                      newLink.set("link", link+"?Cliente="+newCliente.id+"&Industria="+newIndustria.id+"&Areas="+areasLink);
                      newLink.set("fechaLimite", date);
                      newLink.save();
                      $("#link").val("https://steelcasemx-wellbeingsurvey.com"+"?Cliente="+newCliente.id+"&Industria="+newIndustria.id+"&Areas="+areasLink);
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
                    if(arrayCheckAreas[i].id == 'none'){
                      var areas = Parse.Object.extend('areaWell');
                      var newAreas = new areas();
                      newAreas.set('cliente', newCliente);
                      newAreas.set('Name', arrayCheckAreas[i].nombre);
                      newAreas.save(null,{
                        success: function(newAreas){
                          areasLink += newAreas.id+"-";
                        }
                      });
                    }else{
                          areasLink += arrayCheckAreas[i].id+"-";
                    }
      //termina creación areas con cliente
                  }
                  newLink.set("cliente", newCliente);
                  newLink.set("areas", arrayCheckAreas);
                  newLink.set("link", link+"?Cliente="+newCliente.id+"&Industria="+res[0].id+"&Areas="+areasLink);
                  newLink.set("fechaLimite", date);
                  newLink.save();
                  $("#link").val("https://steelcasemx-wellbeingsurvey.com"+"?Cliente="+newCliente.id+"&Industria="+res[0].id+"&Areas="+areasLink);
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
              data: [fct.toFixed(1), fcrt.toFixed(1), fcr.toFixed(1), fcrb.toFixed(1), fcb.toFixed(1), fclb.toFixed(1), fcl.toFixed(1), fclt.toFixed(1), fceb.toFixed(1)]
            }]
          },
          options: {
           legend: { display: false },
           scale: {
           ticks: {
               beginAtZero: true,
               max: 5,
               fontSize: 8
           }
       }
          }
        });

        var number = pTotal;
        amarillo = pTotal;
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
                data: [fct.toFixed(1), fcrt.toFixed(1), fcr.toFixed(1), fcrb.toFixed(1), fcb.toFixed(1), fclb.toFixed(1), fcl.toFixed(1), fclt.toFixed(1), fceb.toFixed(1)]
              }]
            },
            options: {
             legend: { display: false },
             scale: {
           ticks: {
               beginAtZero: true,
               max: 5,
               fontSize: 8
           }
          }
            }
          });


          //var pTotal=((fct+fcrt+fcr+fcrb+fcb+fclb+fcl+fclt)/8).toFixed(1);
          var total2 = parseFloat(pTotal);
          azul = total2;
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
                data: [fct.toFixed(1), fcrt.toFixed(1), fcr.toFixed(1), fcrb.toFixed(1), fcb.toFixed(1), fclb.toFixed(1), fcl.toFixed(1), fclt.toFixed(1), fceb.toFixed(1)]
              }]
            },
            options: {
             legend: { display: false },
             scale: {
           ticks: {
               beginAtZero: true,
               max: 5,
               fontSize: 8
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

/* las siguientes 3 funciones obtienen
la información para mostar un reporte general de generación  */
reporteGeneracion(){
    var Wellbeing = Parse.Object.extend('Wellbeing');
    var promise = new Parse.Promise();

    for (let i = 0; i < arrayGeneracion.length; i++) {
      var GenWell  = Parse.Object.extend('genWell');
      var generacion = new GenWell();
          generacion.id = arrayGeneracion[i].id;
      var query  = new Parse.Query(Wellbeing);
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
          var generacion = new GenWell();
              generacion.id = arrayGeneracion[i].id;
          var query  = new Parse.Query(Wellbeing);
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
      var generacion = new GenWell();
          generacion.id = arrayGeneracion[i].id;
      var query  = new Parse.Query(Wellbeing);
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

/*reporteIndAmarillo(){
  var Wellbeing = Parse.Object.extend('Wellbeing');
  var promise = new Parse.Promise();
    this.reporteGenVerde().then((results: any) => {
      for (let i = 0; i < arrayIndustrias.length; i++) {
        var IndWell  = Parse.Object.extend('indWell');
        var industria = new IndWell();
            industria.id = arrayIndustrias[i].id;
        var query  = new Parse.Query(Wellbeing);
            query.equalTo("industria", industria);
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
                    arrIndAmarillo.push({nombre: arrayIndustrias[i].nombre,
                                        total: pTotal.toFixed(1)})
                }else{
                  arrIndAmarillo.push({nombre: arrayIndustrias[i].nombre, total: 'NA'})
                }
                promise.resolve(arrIndAmarillo.sort(compararNombre))
              }
            })

      }
    })
      return promise;
} //add reporte gen verde*/

/*reporteIndAzul(){
  var Wellbeing = Parse.Object.extend('WellCognitivo');
  var promise = new Parse.Promise();
  this.reporteIndAmarillo().then((results: any) =>{
    for (let i = 0; i < arrayIndustrias.length; i++) {
      var IndWell  = Parse.Object.extend('indWell');
      var industria = new IndWell();
          industria.id = arrayIndustrias[i].id;
      var query  = new Parse.Query(Wellbeing);
          query.equalTo("industria", industria);
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
                arrIndAzul.push({nombre: arrayIndustrias[i].nombre,
                                total: pTotal.toFixed(1)})
              }else{
                arrIndAzul.push({nombre: arrayIndustrias[i].nombre, total: 'NA'})
              }
              promise.resolve(arrIndAzul.sort(compararNombre))
            }
          })
    }//termina for primer arreglo
  })
  return promise;
}*/

/*reporteIndVerde(){
  var Wellbeing = Parse.Object.extend('WellEmocional');
  var promise = new Parse.Promise();
  this.reporteIndAzul().then((results: any) => {
    for (let i = 0; i < arrayIndustrias.length; i++) {
      var IndWell  = Parse.Object.extend('indWell');
      var industria = new IndWell();
          industria.id = arrayIndustrias[i].id;
      var query  = new Parse.Query(Wellbeing);
          query.equalTo("industria", industria);
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
                arrIndVerde.push({nombre: arrayIndustrias[i].nombre,
                                  total: pTotal.toFixed(1)})
              }else{
                arrIndVerde.push({nombre: arrayIndustrias[i].nombre, total: 'NA'})
              }
                promise.resolve(arrIndVerde.sort(compararNombre))
            }
          })
    }//termina for primer arreglo
  })
  return promise;
}*/

reporteAreaAmarillo(){
  var Wellbeing = Parse.Object.extend('Wellbeing');
  var promise = new Parse.Promise();
    this.reporteGenVerde().then((results: any) => {
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

reporteAntAmarillo(){
  var Wellbeing = Parse.Object.extend('Wellbeing');
  var promise = new Parse.Promise();
    this.reporteAreaVerde().then((results: any) => {
      for (let i = 0; i < arrayAnt.length; i++) {
        var AntWell  = Parse.Object.extend('Antiguedad');
        var antiguedad = new AntWell();
            antiguedad.id = arrayAnt[i].id;
        var query  = new Parse.Query(Wellbeing);
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
                                        total: pTotal.toFixed(1),orden:arrayAnt[i].orden})
                }else{
                  arrAntAmarillo.push({nombre: arrayAnt[i].nombre, total: 'NA', orden:arrayAnt[i].orden})
                }
                promise.resolve(arrAntAmarillo.sort(comparar))
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
      var query  = new Parse.Query(Wellbeing);
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
                                total: pTotal.toFixed(1),orden:arrayAnt[i].orden})
              }else{
                arrAntAzul.push({nombre: arrayAnt[i].nombre, total: 'NA', orden:arrayAnt[i].orden})
              }
              promise.resolve(arrAntAzul.sort(comparar))
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
      var query  = new Parse.Query(Wellbeing);
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
                                  total: pTotal.toFixed(1), orden:arrayAnt[i].orden})
              }else{
                arrAntVerde.push({nombre: arrayAnt[i].nombre, total: 'NA', orden:arrayAnt[i].orden})
              }
                promise.resolve(arrAntVerde.sort(comparar))
            }
          })
    }//termina for primer arreglo
  })
  return promise;
}


getInd(){
  this.reporteAntVerde().then((results: any) =>{
    console.log(arrAntAmarillo);
    console.log(arrAntAzul);
    console.log(results);

  })
}

sigPaso(){
  $("#modalAlert").modal('toggle');
  this.reporteAntVerde().then((results: any) =>{
    /*console.log(arrGenAmarillo);
    console.log(arrGenAzul);
    console.log(arrGenVerde)
    console.log(arrIndAmarillo);
    console.log(arrIndAzul);
    console.log(arrIndVerde);
    console.log(arrAreaAmarillo);
    console.log(arrAreaAzul);
    console.log(arrAreaVerde);
    console.log(arrAntAmarillo);
    console.log(arrAntAzul);
    console.log(results);*/
    crearImagen(crearImagenDone)
  })
}

 imagenChart(){
   html2canvas($("#myChartYellow"), {
       onrendered: function(canvas) {
           var theCanvas = canvas;
           //document.body.appendChild(canvas);
           Canvas2Image.saveAsPNG(canvas);
           //image.src = canvas.toDataURL("image/png");
           console.log("primer paso")
           //cb1(image.src);
       }
   });
}

  crearPptx(){
    this.sigPaso();

  }

  muestraGen(){
    this.router.navigate(['/generalGeneracion/:'+'-F='+amarillo.toFixed(1)+"&C="+azul.toFixed(1)+"&V="+verde.toFixed(1)])
  }

  muestraAnt(){
    this.router.navigate(['/generalAntiguedad/:'+'-F='+amarillo.toFixed(1)+"&C="+azul.toFixed(1)+"&V="+verde.toFixed(1)])
  }

  ngOnInit() {

  //  document.getElementById("testScript").remove();
var testScript = document.createElement("script");
testScript.setAttribute("id", "testScript");
testScript.setAttribute("src", "assets/PptxGenJS/dist/pptxgen.js");
document.body.appendChild(testScript);

var testScript2 = document.createElement("script");
testScript2.setAttribute("id", "testScript");
testScript2.setAttribute("src", "assets/PptxGenJS/libs/jszip.min.js");
document.body.appendChild(testScript2);

    this.circuloVerde();
    this.addIndustrias();
    this.addEmpresa();
    this.addAntiguedad();
    this.addGeneracion();
    this.areasLink();
    this.getIdAreas();
    //this.reporteGeneracion();
    arrayClientes.length = 0;
    arrayAnt.length = 0;
    arrayGeneracion.length = 0;
    //arrayIndustrias.length = 0;
    arrayAreasWell.length = 0;
  //  this.crearReporte();
    //this.crearImagen()
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
      //  Canvas2Image.saveAsPNG(canvas);
          image.src = canvas.toDataURL("image/png");
          console.log("primer paso")
          cb1(image.src);
      }
  });

  html2canvas($("#amarillo"), {
      onrendered: function(canvas) {
          var theCanvas = canvas;
          //document.body.appendChild(canvas);
          //Canvas2Image.saveAsPNG(canvas);
          image.src = canvas.toDataURL("image/png");
          console.log("primer paso")
          //cb1(image.src);
      }
  });


  //return image;
}



function crearImagenDone(infoImage: any){
  console.log("2do paso")
  crearReporte(infoImage);
}

function convierteDatos(){

}

function crearReporte(info: any){
  try{
    var dataimage = info.substring(info.indexOf(":")+1);
    //console.log(info);
    var pptx = new PptxGenJS();
    var slide = pptx.addNewSlide();
    var slideR = pptx.addNewSlide();
    //var slideInd = pptx.addNewSlide();
    //var slideInd2  = pptx.addNewSlide();
    var slideArea = pptx.addNewSlide();
    var slideArea2 = pptx.addNewSlide();
    var slideAnt = pptx.addNewSlide();
    var slideGrafico = pptx.addNewSlide();
    //var slideGraficoInd = pptx.addNewSlide();
    var slideGraficoA = pptx.addNewSlide();
    var slideGraficoAnt = pptx.addNewSlide();


    var datosGraf = [];
    var datosArea = [];
    var datosAnt = [];
    //var datosInd = [];



    for (let i = 0; i < arrGenAmarillo.length; i++) {
      var total = (parseFloat(arrGenAmarillo[i].total) + parseFloat(arrGenAzul[i].total) + parseFloat(arrGenVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosGraf.push(total)
      }else{
        datosGraf.push(total)
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
        datosAnt.push(total)
      }
    }

  /*  for (let i = 0; i < arrIndAmarillo.length; i++) {
      var total = (parseFloat(arrIndAmarillo[i].total) + parseFloat(arrIndAzul[i].total) + parseFloat(arrIndVerde[i].total))/3;
      if( total.toString() == 'NaN'){
        total = 0;
        datosInd.push(total)
      }else{
        datosInd.push(total)
      }
    }*/

    var dataChartPieGen = [{ name: 'Generación',
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
    labels: [arrAreaAmarillo[0].nombre, arrAreaAmarillo[1].nombre, arrAreaAmarillo[2].nombre, arrAreaAmarillo[3].nombre, arrAreaAmarillo[4].nombre, arrAreaAmarillo[5].nombre, arrAreaAmarillo[6].nombre, arrAreaAmarillo[7].nombre],
    values: [  datosArea[0],   datosArea[1],   datosArea[2],   datosArea[3],   datosArea[4], datosArea[5], datosArea[6], datosArea[7]]
}];
    slideGraficoA.addText('Área', { x:5.0, y:0.5, font_size:18, color:'363636' })
    slideGraficoA.addChart(pptx.charts.PIE, dataChartPieArea,
        {
            x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
            chartColors:['0079AE','0091D0','4cc3c0','ACCDEC', '53aac6', '3e9abb', '6cabce', '328b95'], dataLabelColor:'FFFFFF'
        });


  /*      var dataChartPieAnt = [{ name: 'Antigüedad',
        labels: [arrAntAmarillo[0].nombre, arrAntAmarillo[1].nombre, arrAntAmarillo[2].nombre, arrAntAmarillo[3].nombre],
        values: [  datosAnt[0],   datosAnt[1],   datosAnt[2],   datosAnt[3]]
    }];
        slideGraficoInd.addText('Antigüedad', { x:5.0, y:0.5, font_size:18, color:'363636' })
        slideGraficoInd.addChart(pptx.charts.PIE, dataChartPieAnt,
            {
                x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
                chartColors:['E9B200','FFC000','FFD243','FFE286'], dataLabelColor:'FFFFFF'
            });*/

      /*      var dataChartPieInd = [{ name: 'Industria',
            labels: [arrIndAmarillo[0].nombre, arrIndAmarillo[1].nombre, arrIndAmarillo[2].nombre,
            arrIndAmarillo[3].nombre, arrIndAmarillo[4].nombre, arrIndAmarillo[5].nombre,
            arrIndAmarillo[6].nombre, arrIndAmarillo[7].nombre, arrIndAmarillo[8].nombre, arrIndAmarillo[9].nombre],
            values: [  datosInd[0],   datosInd[1],   datosInd[2],   datosInd[3], datosInd[4],
                     datosInd[5], datosInd[6], datosInd[7], datosInd[8], datosInd[9]]
        }];
            slideGraficoAnt.addText('Industria', { x:5.0, y:0.5, font_size:18, color:'363636' })
            slideGraficoAnt.addChart(pptx.charts.PIE, dataChartPieInd,
                {
                    x:1.5, y:0.9, w:7.5, h:4.5, showLegend:true, legendPos:'t',
                    chartColors:['FC0000','FFCC00','009900','6600CC','0091D0', 'FFE286', '4cc3c0'], dataLabelColor:'FFFFFF'
                });*/



    slide.addText('ÍNDICE DE BIENESTAR GLOBAL', { x:3.0, y:0.5, font_size:18, color:'363636' });
    slide.addImage({x:3.5, y:.8, w:2.8, h:2,
    data: info})
    slide.addText('FÍSICO '+amarillo.toFixed(1),{x:1, y:3.0, font_size:18, font_face:'Arial Black', color:'FBC100'})
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
    })

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


    slideR.addText(arrGenAmarillo[1].nombre, {x:2.7, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[1].toFixed(1), {x:3.15, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:3.1, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[1].total, {x:3.13, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:3.1, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[1].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[1].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideR.addText(arrGenAmarillo[2].nombre, {x:4.5, y:1.5, font_size:18, color:'363636'})
    slideR.addText(datosGraf[2].toFixed(1), {x:4.9, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:4.9, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideR.addText(arrGenAmarillo[2].total, {x:4.95, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideR.addImage({x:4.9, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideR.addText(arrGenAzul[2].total, {x:4.95, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideR.addImage({x:4.9, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideR.addText(arrGenVerde[2].total, {x:4.95, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


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


  /*  slideInd.addText('INDUSTRIA', { x:4.4, y:0.5, font_size:18, color:'363636' });
    slideInd.addText(arrIndAmarillo[0].nombre, {x:0.9, y:1.5, font_size:18, color:'363636'})
    slideInd.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideInd.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideInd.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideInd.addText(datosInd[0].toFixed(1), {x:1.2  , y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:1.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd.addText(arrIndAmarillo[0].total, {x:1.26, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:1.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd.addText(arrIndAzul[0].total, {x:1.26, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd.addImage({x:1.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd.addText(arrIndVerde[0].total, {x:1.26, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd.addText(arrIndAmarillo[1].nombre, {x:2.79, y:1.5, font_size:18, color:'363636'})
    slideInd.addText(datosInd[1].toFixed(1), {x:3.15, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:3.1, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd.addText(arrIndAmarillo[1].total, {x:3.13, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:3.1, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd.addText(arrIndAzul[1].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd.addText(arrIndVerde[1].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd.addText(arrIndAmarillo[2].nombre, {x:4.65, y:1.5, font_size:18, color:'363636'})
    slideInd.addText(datosInd[2].toFixed(1), {x:4.85, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:4.9, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd.addText(arrIndAmarillo[2].total, {x:4.95, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:4.9, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd.addText(arrIndAzul[2].total, {x:4.95, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd.addImage({x:4.9, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd.addText(arrIndVerde[2].total, {x:4.95, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd.addText(arrIndAmarillo[3].nombre, {x:6.42, y:1.5, font_size:18, color:'363636'})
    slideInd.addText(datosInd[3].toFixed(1), {x:6.58, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:6.6, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd.addText(arrIndAmarillo[3].total, {x:6.65, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:6.6, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd.addText(arrIndAzul[3].total, {x:6.65, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd.addImage({x:6.6, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd.addText(arrIndVerde[3].total, {x:6.65, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideInd.addText(arrIndAmarillo[4].nombre, {x:7.8, y:1.5, font_size:18, color:'363636'})
    slideInd.addText(datosInd[4].toFixed(1), {x:8.2, y:2.1, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:8.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd.addText(arrIndAmarillo[4].total, {x:8.25, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd.addImage({x:8.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd.addText(arrIndAzul[4].total, {x:8.25, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd.addImage({x:8.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd.addText(arrIndVerde[4].total, {x:8.25, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd2.addText('INDUSTRIA', { x:4.4, y:0.5, font_size:18, color:'363636' });
    slideInd2.addText(arrIndAmarillo[5].nombre, {x:0.9, y:1.5, font_size:18, color:'363636'})
    slideInd2.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideInd2.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideInd2.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideInd2.addText(datosInd[5].toFixed(1), {x:1.25, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:1.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd2.addText(arrIndAmarillo[5].total, {x:1.26, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:1.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd2.addText(arrIndAzul[5].total, {x:1.26, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd2.addImage({x:1.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd2.addText(arrIndVerde[5].total, {x:1.26, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd2.addText(arrIndAmarillo[6].nombre, {x:2.95, y:1.5, font_size:18, color:'363636'})
    slideInd2.addText(datosInd[6].toFixed(1), {x:3.1, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:3.1, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd2.addText(arrIndAmarillo[6].total, {x:3.13, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:3.1, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd2.addText(arrIndAzul[6].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd2.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd2.addText(arrIndVerde[6].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd2.addText(arrIndAmarillo[7].nombre, {x:4.4, y:1.5, font_size:18, color:'363636'})
    slideInd2.addText(datosInd[7].toFixed(1), {x:4.9, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:4.9, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd2.addText(arrIndAmarillo[7].total, {x:4.95, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:4.9, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd2.addText(arrIndAzul[7].total, {x:4.95, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd2.addImage({x:4.9, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd2.addText(arrIndVerde[7].total, {x:4.95, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideInd2.addText(arrIndAmarillo[8].nombre, {x:6.5, y:1.5, font_size:18, color:'363636'})
    slideInd2.addText(datosInd[8].toFixed(1), {x:6.58, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:6.6, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd2.addText(arrIndAmarillo[8].total, {x:6.65, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:6.6, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd2.addText(arrIndAzul[8].total, {x:6.65, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd2.addImage({x:6.6, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd2.addText(arrIndVerde[8].total, {x:6.65, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideInd2.addText(arrIndAmarillo[9].nombre, {x:7.9, y:1.5, font_size:18, color:'363636'})
    slideInd2.addText(datosInd[9].toFixed(1), {x:8.2, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:8.2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideInd2.addText(arrIndAmarillo[9].total, {x:8.25, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideInd2.addImage({x:8.2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideInd2.addText(arrIndAzul[9].total, {x:8.25, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideInd2.addImage({x:8.2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideInd2.addText(arrIndVerde[9].total, {x:8.25, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})*/




    slideArea.addText('ÁREA', { x:4.6, y:0.5, font_size:18, color:'363636' });
    slideArea.addText(arrAreaAmarillo[0].nombre, {x:0.6, y:1.5, font_size:18, color:'363636'})
    slideArea.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideArea.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideArea.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideArea.addText(datosArea[0].toFixed(1), {x:2, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:2, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea.addText(arrAreaAmarillo[0].total, {x:2, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:2, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea.addText(arrAreaAzul[0].total, {x:2, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea.addImage({x:2, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea.addText(arrAreaVerde[0].total, {x:2, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideArea.addText(arrAreaAmarillo[1].nombre, {x:3.9, y:1.5, font_size:18, color:'363636'})
    slideArea.addText(datosArea[1].toFixed(1), {x:4.69, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:4.7, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea.addText(arrAreaAmarillo[1].total, {x:4.73, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:4.7, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea.addText(arrAreaAzul[1].total, {x:4.73, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea.addImage({x:4.7, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea.addText(arrAreaVerde[1].total, {x:4.73, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideArea.addText(arrAreaAmarillo[2].nombre, {x:6.4, y:1.5, font_size:18, color:'363636'})
    slideArea.addText(datosArea[2].toFixed(1), {x:6.68, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:6.68, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea.addText(arrAreaAmarillo[2].total, {x:6.68, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:6.68, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea.addText(arrAreaAzul[2].total, {x:6.68, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea.addImage({x:6.68, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea.addText(arrAreaVerde[2].total, {x:6.68, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})

    slideArea.addText(arrAreaAmarillo[3].nombre, {x:7.72, y:1.5, font_size:18, color:'363636'})
    slideArea.addText(datosArea[3].toFixed(1), {x:8.2, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:8.07, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea.addText(arrAreaAmarillo[3].total, {x:8.09, y:2.6, font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea.addImage({x:8.07, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea.addText(arrAreaAzul[3].total, {x:8.09, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea.addImage({x:8.07, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea.addText(arrAreaVerde[3].total, {x:8.09, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideArea2.addText('ÁREA', { x:4.6, y:0.5, font_size:18, color:'363636' });
    slideArea2.addText(arrAreaAmarillo[4].nombre, {x:1.6, y:1.5, font_size:18, color:'363636'})
    slideArea2.addText('F', { x:0.5, y:2.6, font_size:18, color:'363636' })
    slideArea2.addText('C', { x:0.5, y:3.6, font_size:18, color:'363636' })
    slideArea2.addText('E', { x:0.5, y:4.6, font_size:18, color:'363636' })
    slideArea2.addText(datosArea[4].toFixed(1), {x:2.09, y:2.1  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:2.05, y:2.4, w:0.7, h:0.7,path: 'assets/img/yellow_circle.svg'})
    slideArea2.addText(arrAreaAmarillo[4].total, {x:2.1, y:2.6  , font_size:18, font_face:'Arial Black', color:'FBC100'})
    slideArea2.addImage({x:2.05, y:3.4, w:0.7, h:0.7,path: 'assets/img/blue_circle.svg'})
    slideArea2.addText(arrAreaAzul[4].total, {x:2.1, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideArea2.addImage({x:2.05, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideArea2.addText(arrAreaVerde[4].total, {x:2.1, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


    slideArea2.addText(arrAreaAmarillo[5].nombre, {x:3.7, y:1.5, font_size:18, color:'363636'})
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
    slideArea2.addText(arrAreaVerde[7].total, {x:7.4, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


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
    slideAnt.addText(arrAntAzul[1].total, {x:3.15, y:3.6  , font_size:18, font_face:'Arial Black', color:'31AEF2'})
    slideAnt.addImage({x:3.1, y:4.4, w:0.7, h:0.7,path: 'assets/img/green_circle.svg'})
    slideAnt.addText(arrAntVerde[1].total, {x:3.17, y:4.6  , font_size:18, font_face:'Arial Black', color:'98CE3D'})


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
  }


}
