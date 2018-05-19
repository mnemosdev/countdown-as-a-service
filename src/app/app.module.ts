import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { RouterModule, Routes } from '@angular/router';
import { TimerComponent } from './timer/timer.component';

const appRoutes: Routes = [
  { path: 'countdown/:seconds', component: TimerComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
