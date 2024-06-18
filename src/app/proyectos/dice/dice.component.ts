import { Component } from '@angular/core';

@Component({
  selector: 'app-dice',
  templateUrl: './dice.component.html',
  styleUrl: './dice.component.css'
})

export class DiceComponent {

  dado1: number = 0;
  dado2: number = 0;
  bandera: boolean = false;
  ganador: number = 0;
  ganadas1: number = 0;
  ganadas2: number = 0;

  generadorNumerosRandom() {
    return Math.floor(Math.random() * 6) + 1;
  }

  numero1() {
    this.dado1 = this.generadorNumerosRandom();
    this.resultado();
  }

  numero2() {
    this.dado2 = this.generadorNumerosRandom();
    this.resultado();
  }

  resultado() {
    if (this.dado1 != 0 && this.dado2 != 0) {
      this.bandera = true;
      if (this.dado1 > this.dado2) {
        this.ganador = 1;
        this.ganadas1++;
      }
      else if (this.dado1 == this.dado2) {
        this.ganador = 3;
      }
      else {
        this.ganador = 2;
        this.ganadas2++;
      }
    }
  }

  reiniciar() {
    this.dado1 = 0;
    this.dado2 = 0;
    this.bandera = false;
    this.ganador = 0;
  }

}
