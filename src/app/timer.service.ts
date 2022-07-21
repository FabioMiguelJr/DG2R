// Classe de serviço - Timer
import { Injectable } from '@angular/core';
import { Exercise } from './exercise';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  exercises: Exercise[] = [
    {
      name: 'Abdominal',
      duration: 30,
      repetition: 3,
      preparation: 15,
      rest: 20,
    },
  ];

  currentEx: number = 0;
  currentRep: number = 0;
  phase: number = 0;
  timeLeft: number = 0;

  restart() {
    this.currentEx = 0;
    this.currentRep = 0;
    this.phase = 0;
    const ex = this.exercises[this.currentEx];
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  next() {
    let exr: number = 0;
    if (this.phase < 2) {
      this.phase++;
    } else {
      const ex = this.exercises[this.currentEx];
      if (ex.repetition) {
        exr = ex.repetition;
      } else {
        exr = 0;
      }
      if (this.currentRep < exr - 1) {
        this.currentRep++;
        this.phase = 1;
      } else {
        if (this.currentEx < this.exercises.length - 1) {
          this.currentEx++;
          this.currentRep = 0;
          this.phase = 0;
        } else {
          return;
        }
      }
    }
    this.timeLeft = this.getTimeOfCurrentPhase();
  }

  decrementTimeLeft() {
    if (this.timeLeft > 0) {
      this.timeLeft--;
    } else {
      this.next();
    }
  }

  private getTimeOfCurrentPhase() {
    const ex = this.exercises[this.currentEx];
    switch (this.phase) {
      case 0: {
        if (ex.preparation) {
          return ex.preparation * 10;
        } else {
          return 0;
        }
        break;
      }
      case 1:
        if (ex.duration) {
          return ex.duration * 10;
        } else {
          return 0;
        }
        break;
      case 2:
        if (ex.rest) {
          return ex.rest * 10;
        } else {
          return 0;
        }
        break;
      default:
        return 0;
    }
  }

  add(exercise: Exercise) {
    this.exercises.push(exercise);
  }

  delete(i: number) {
    this.exercises.splice(i, 1);
  }
}
