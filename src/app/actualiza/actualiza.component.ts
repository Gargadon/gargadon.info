import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Empleado } from '../empleado.model';
import { ServicioEmpleadosService } from '../servicio-empleados.service';
import { EmpleadosService } from '../empleados.service';

@Component({
  selector: 'app-actualiza',
  templateUrl: './actualiza.component.html',
  styleUrl: './actualiza.component.css'
})
export class ActualizaComponent {
  empleados: Empleado[];
  accion: number;

  constructor(private route: ActivatedRoute, private router: Router, private miServicio: ServicioEmpleadosService, private empleadosService: EmpleadosService) { }

  ngOnInit(): void {
    this.accion = parseInt(this.route.snapshot.queryParams['action']);
    this.empleados = this.empleadosService.empleados;
    this.indice = this.route.snapshot.params['id'];
    this.indice = this.indice - 1;

    let empleado: Empleado = this.empleadosService.encontrarEmpleado(this.indice);

    this.cuadroNombre = empleado.nombre;
    this.cuadroApellido = empleado.apellido;
    this.cuadroCargo = empleado.cargo;
    this.cuadroSalario = empleado.salario;
  }

  volverHome() {
    this.router.navigate(["/proyectos/empleados"]);
  };

  title = "Actualiza";

  cuadroNombre: string = "";
  cuadroApellido: string = "";
  cuadroCargo: string = "";
  cuadroSalario: number = 0;
  indice: number;

  accionEmpleado() {
    switch (this.accion) {
      case 1:
        let miEmpleado = new Empleado(this.cuadroNombre, this.cuadroApellido, this.cuadroCargo, this.cuadroSalario);
        this.empleadosService.actualizarEmpleadoServicio(this.indice, miEmpleado);
        break;
      case 2:
        this.empleadosService.eliminarEmpleadoServicio(this.indice);
        break;
      default:
    }
    this.volverHome();

  }



}
