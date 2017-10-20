import {Injectable} from '@angular/core';
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
@Injectable()

export class Servicios {
  industria : string = "Nueva";
  arregloClientes: any;
  arregloAreas : any;
  arregloAntiguedad: any;
  arregloGeneracion: any;

  constructor (){

  }

  tengoId(id){
    var cadena = "el id es: "+id;
    return cadena;
  }

}
