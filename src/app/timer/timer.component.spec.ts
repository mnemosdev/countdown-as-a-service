import { async, ComponentFixture, TestBed, tick, fakeAsync, flushMicrotasks, discardPeriodicTasks } from '@angular/core/testing';

import { TimerComponent } from './timer.component';

import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

import { of } from "rxjs";
import { ActivatedRouteStub } from '../../testing/activated-route-stub';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;
  let activatedRouter: ActivatedRouteStub;

  beforeEach(() => {
    activatedRouter = new ActivatedRouteStub();
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      imports: [NgbModule.forRoot()],
      providers: [{
          provide: ActivatedRoute,
          useValue: activatedRouter
        }
      ]
    })
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
  });

  it('should create', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 5 })
    expect(component).toBeTruthy();
    discardPeriodicTasks();
  }));

  it('should be initialized with correct values', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 5 })
    fixture.detectChanges();
    expect(component.seconds).toBe(5);
    discardPeriodicTasks();
  }));

  it('should call finish after 5 seconds', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 5 })
    spyOn(component, 'finish');
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    tick(3000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(5);
    expect(component.finish).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should call stop and start on restart', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 5 })
    spyOn(component, 'stop');
    spyOn(component, 'start');
    component.restart();
    expect(component.stop).toHaveBeenCalled();
    expect(component.start).toHaveBeenCalled();
    discardPeriodicTasks();
  }));

  it('should not start when seconds are 0', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 0 })
    tick(4000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    discardPeriodicTasks();
  }));

  it('should reset and not continue after stop', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 8 })
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.stop()
    tick(9000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    discardPeriodicTasks();
  }));

  it('should not continue after pause', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 8 })
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.pause()
    tick(9000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.start()
    tick(2000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(4);
    discardPeriodicTasks();
  }));

  it('should toggle pause', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 8 })
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.togglePause()
    tick(9000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.togglePause()
    tick(2000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(4);
    discardPeriodicTasks();
  }));

  it('should finish', fakeAsync(() => {
    activatedRouter.setParamMap({ seconds: 8 })
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(0);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(1);
    tick(1000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(2);
    component.finish()
    tick(9000);
    fixture.detectChanges();
    expect(component.secondsPassed).toBe(component.seconds);
    component.pause()
    expect(component.status).toBe(component.TimerStatus.FINISHED);
    discardPeriodicTasks();
  }));


  it('should transform remaining time in hh mm ss format', () => {
    component.updateTab(5000)
    expect(component.hh).toBe(1);
    expect(component.mm).toBe(23);
    expect(component.ss).toBe(20);
  });

});
