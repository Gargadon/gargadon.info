import { Component, Input } from '@angular/core';
import { Empleado } from '../empleado.model';

@Component({
  selector: 'app-empleado-hijo-componente',
  templateUrl: './empleado-hijo-componente.component.html',
  styleUrl: './empleado-hijo-componente.component.css'
})
export class EmpleadoHijoComponenteComponent {
  @Input() empleadoLista: Empleado;
  @Input() indice: number;

  arrayCaracteristicas = [];

  agregarCaracteristica(nuevaCaracteristica: string) {
    this.arrayCaracteristicas.push(nuevaCaracteristica);
  }
}
