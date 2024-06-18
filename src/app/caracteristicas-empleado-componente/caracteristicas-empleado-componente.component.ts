import { Output, EventEmitter, Component } from '@angular/core';
@Component({
  selector: 'app-caracteristicas-empleado-componente',
  templateUrl: './caracteristicas-empleado-componente.component.html',
  styleUrl: './caracteristicas-empleado-componente.component.css'
})


export class CaracteristicasEmpleadoComponenteComponent {
  @Output() caracteristicasEmpleados = new EventEmitter<string>();
  
    agregarCaracteristicas(value: string) {
      this.caracteristicasEmpleados.emit(value);
    }

}
