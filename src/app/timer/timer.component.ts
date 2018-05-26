import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {interval} from 'rxjs';


enum TimerStatus {
  PAUSED,
  ONGOING,
  FINISHED,
  STOP
}


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  seconds: number = 0
  secondsPassed: number = 0
  intervalSubscriber: any
  status = TimerStatus.STOP

  hh = 0;
  mm = 0;
  ss = 0;

  public TimerStatus: any = TimerStatus;

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => {
      this.seconds = +pmap.get('seconds')
      this.updateTab(this.seconds)
      this.start()
    });
  }

  updateTab(remainingSeconds: number): any {
    this.hh = Math.floor(remainingSeconds / 3600);
    this.mm = Math.floor((remainingSeconds % 3600) / 60);
    this.ss = remainingSeconds % 60
  }

  start(): any {
    if (this.seconds == 0 || this.status == TimerStatus.ONGOING) {
      return;
    }
    this.status = TimerStatus.ONGOING
    this.intervalSubscriber = interval(1000).subscribe((val) => {
      this.secondsPassed += 1;
      this.updateTab(this.seconds - this.secondsPassed)
      if (this.seconds == this.secondsPassed) {
        this.finish()
      }
    });
  }

  stop(): any {
    this.status = TimerStatus.STOP
    this.secondsPassed = 0
    this.updateTab(this.seconds)
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  finish(): any {
    this.status = TimerStatus.FINISHED
    this.secondsPassed = this.seconds;
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  togglePause(): any {
    if (this.status == TimerStatus.FINISHED) {
      this.restart();
      return;
    }
    if (this.status == TimerStatus.ONGOING) {
      this.pause();
    } else {
      this.start();
    }
  }

  pause(): any {
    if (this.status != TimerStatus.ONGOING) {
      return
    }
    this.status = TimerStatus.PAUSED
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  remaining(): number {
    return (100 - (this.secondsPassed / this.seconds) * 100)
  }

  restart(): any {
    this.stop()
    this.start()
  }

}
