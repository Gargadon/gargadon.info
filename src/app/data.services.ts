import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Empleado } from "./empleado.model";
import { response } from "express";
import { error } from "console";

@Injectable()
export class DataServices{
    constructor(private httpClient:HttpClient) {}

    guardarEmpleados(empleados:Empleado[]){
        this.httpClient.put('https://gargadon-d17b7-default-rtdb.firebaseio.com/datos.json',empleados).subscribe(
            response=>console.log("Se han guardado los empleados: " + response),
            error=>console.log("Error:" + error)
        );
    }

    recibirEmpleados() {
        return this.httpClient.get('https://gargadon-d17b7-default-rtdb.firebaseio.com/datos.json');
    }
}