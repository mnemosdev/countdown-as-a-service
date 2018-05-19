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
  intervalSubscriber: any

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.seconds = +this.route.snapshot.paramMap.get('seconds')
    this.start()
  }

  start(): any {
    this.intervalSubscriber = interval(1000).subscribe((val) => {
      console.log(val)
      if (this.seconds == val) {
        this.stop()
      }
    });
  }

  stop(): any {
    console.log('Stop')
    if (this.intervalSubscriber) {
      this.intervalSubscriber.unsubscribe()
    }
  }

  restart(): any {
    this.stop()
    this.start()
  }

}
