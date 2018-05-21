import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {interval} from 'rxjs';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  seconds: number = 0
  secondsPassed: number = 0;
  intervalSubscriber: any

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(pmap => {
      this.seconds = +pmap.get('seconds')
      this.start()
    });
  }


  start(): any {
    if (this.seconds == 0) {
      return;
    }
    this.intervalSubscriber = interval(1000).subscribe((val) => {
      if (this.seconds == (val + 1)) {
        this.stop()
      } else {
        this.secondsPassed += 1;
      }
    });
  }

  stop(): any {
    this.secondsPassed = 0
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  pause(): any {
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  restart(): any {
    this.stop()
    this.start()
  }

}
