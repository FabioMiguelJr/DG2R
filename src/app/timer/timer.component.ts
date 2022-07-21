import { Component, OnDestroy, OnInit } from '@angular/core';
import { TimerService } from '../timer.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css'],
})
export class TimerComponent implements OnInit, OnDestroy {
  //Transferido para o sedrvico TimerService
  //@Input() exercises: Exercise[] = [];
  //currentEx: number = 0;
  //currentRep: number = 0;
  //phase: number = 0;
  //timeLeft: number = 0;
  interval: number = 0;

  constructor(public ts: TimerService) {}

  //Removida para refaturar a aplicação -- utilizaremos services
  //ngOnInit(): void {
  //  this.trestart();
  //}

  ngOnInit(): void {
    this.ts.restart();
  }

  formatPhase(phase: number) {
    switch (phase) {
      case 0:
        return 'Preparação';
      case 1:
        return 'Exercício';
      case 2:
        return 'Descanso';
      default:
        return '';
    }
  }

  // Removida para refaturar a aplicação -- Utilizaremos pipes
  //formatTimeLeft(time: number) {
  //  return (time / 10).toString();
  //}

  start() {
    if (!this.interval) {
      this.interval = window.setInterval(() => {
        this.ts.decrementTimeLeft();
      }, 100);
    }
  }

  pause() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = 0;
    }
  }

  ngOnDestroy(): void {
    this.pause();
  }

  restart() {
    this.ts.restart();
  }

  next() {
    this.ts.next();
  }
}
