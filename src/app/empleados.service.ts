import { Injectable } from "@angular/core";
import { Empleado } from "./empleado.model";
import { ServicioEmpleadosService } from "./servicio-empleados.service";
import { DataServices } from "./data.services";

@Injectable()
export class EmpleadosService{

    constructor(private ventanaEmergente:ServicioEmpleadosService, private dataService:DataServices) {
    };

    setEmpleados(misEmpleados:Empleado[]){
      this.empleados = misEmpleados;
    }

    empleados: Empleado[] = [];

    // empleados: Empleado[] = [
    //     new Empleado("Paquita", "Navajas", "Presidente", 17000),
    //     new Empleado("Max", "Power", "Soldador", 9000),
    //     new Empleado("Pechugas", "Larú", "Secretaria", 7000),
    //     new Empleado("Lalo", "Landa", "Vigilante", 8000)
    //   ];

      agregarEmpleadoServicio(empleado:Empleado) {
        this.ventanaEmergente.muestraMensaje(empleado.nombre);
        this.empleados.push(empleado);
        this.dataService.guardarEmpleados(this.empleados);
      }

      encontrarEmpleado(id:number) {
        let empleado:Empleado = this.empleados[id];
        return empleado;
      }

      actualizarEmpleadoServicio(id:number, empleado:Empleado) {
        let empleadoModificado=this.empleados[id];
        empleadoModificado.nombre = empleado.nombre;
        empleadoModificado.apellido = empleado.apellido;
        empleadoModificado.cargo = empleado.cargo;
        empleadoModificado.salario = empleado.salario;
      }

      eliminarEmpleadoServicio(id:number) {
        this.empleados.splice(id,1);
      }

      obtenerEmpleados(){
        return this.dataService.recibirEmpleados();
      }
}