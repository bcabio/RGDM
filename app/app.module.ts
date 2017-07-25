import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { MainViewComponent } from './components/main-view/main-view.component';
@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ MainViewComponent ],
  bootstrap:    [ MainViewComponent ]
})
export class AppModule { }
