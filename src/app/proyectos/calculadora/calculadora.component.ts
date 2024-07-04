import { Component } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrl: './calculadora.component.css'
})
export class CalculadoraComponent {

  constructor(private clipboard: Clipboard) {}

  display: string = '0';
  acumuladorGlobal: number = 0;
  acumuladorPantalla: number = 0;
  valor: number = 0;
  newNumber: boolean = true;
  negativo: number;

  appendToDisplay(value: string): void {
    if (this.newNumber) {
      if (value != '0') {
        this.display = value;
        this.newNumber = false;
      }
      // Para poder agregar 0 como argumento
      else if (this.display != '0') {
        if (value == '0') {
          this.display = value;
        }
      }
    }
    else {
      this.display = this.display + value;
    }
  }

  clearDisplay(): void {
    this.borrar();
  }

  operacion(valor: number) {
    this.acumuladorPantalla = Number(this.display);
    // Debemos verificar que no hay operacion anterior
    if (this.valor == 0) {
      this.acumuladorGlobal = this.acumuladorPantalla;
    }
    else {
      switch (this.valor) {
        case 1:
          this.acumuladorGlobal = this.acumuladorGlobal + this.acumuladorPantalla;
          break;
        case 2:
          this.acumuladorGlobal = this.acumuladorGlobal - this.acumuladorPantalla;
          break;
        case 3:
          this.acumuladorGlobal = this.acumuladorGlobal * this.acumuladorPantalla;
          break;
        case 4:
          this.acumuladorGlobal = this.acumuladorGlobal / this.acumuladorPantalla;
          break;
        default:
          this.acumuladorGlobal = this.acumuladorPantalla;
      }
    }
    this.valor = valor;
    this.newNumber = true;
    this.display = String(this.acumuladorGlobal);
  }

  borrar() {
    this.display = '0';
    this.acumuladorGlobal = 0;
    this.acumuladorPantalla = 0;
    this.newNumber = true;
  }

  copy() {
    this.clipboard.copy(this.display);
  }

  negative() {
    this.negativo = Number(this.display);
    this.negativo = -this.negativo;
    this.display = String(this.negativo);
  }

  borrarTexto() {
    if(this.display.length == 1)
      {
        this.display = '0';
        this.newNumber = true;
      }
      else {
        this.display = this.display.substring(0, this.display.length - 1);
      }
  }
}
