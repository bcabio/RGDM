import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { MainViewComponent } from './components/main-view/main-view.component';

import { WindowRefSrvc } from './services/window-ref-srvc/window-ref-srvc.service';
@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers:    [ WindowRefSrvc ],
  declarations: [ MainViewComponent ],
  bootstrap:    [ MainViewComponent ]
})
export class AppModule { }
