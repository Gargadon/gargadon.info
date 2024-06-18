import { Component } from '@angular/core';
import { Empleado } from '../../empleado.model';
import { ServicioEmpleadosService } from '../../servicio-empleados.service';
import { EmpleadosService } from '../../empleados.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrl: './empleados.component.css'
})
export class EmpleadosComponent {
  constructor(private miServicio: ServicioEmpleadosService, private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.empleadosService.obtenerEmpleados().subscribe(misEmpleados => {
      console.log(misEmpleados);
      this.empleados = Object.values(misEmpleados);
      this.empleadosService.setEmpleados(this.empleados);
    });

  }
  empleados: Empleado[] = [];
  title = 'Proyectos';

  cuadroNombre: string = "";
  cuadroApellido: string = "";
  cuadroCargo: string = "";
  cuadroSalario: number = 0;


  agregarEmpleado() {
    let miEmpleado = new Empleado(this.cuadroNombre, this.cuadroApellido, this.cuadroCargo, this.cuadroSalario);
    //this.miServicio.muestraMensaje("Nombre del empleado: " + miEmpleado.nombre);
    this.empleadosService.agregarEmpleadoServicio(miEmpleado);
  }


}
