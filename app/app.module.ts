import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule }    from '@angular/http';

import { MainViewComponent } from './components/main-view/main-view.component';
import { NumberInputFormComponent } from './components/number-input-form/number-input-form.component';
import { NumberInputViewComponent } from './components/number-input-view/number-input-view.component';

import { WindowRefSrvc } from './services/window-ref-srvc/window-ref-srvc.service';
import { MusicGeneratorSrvc } from './services/music-generator-srvc/music-generator-srvc.service'

@NgModule({
  imports:      [ BrowserModule, HttpModule ],
  providers:    [ WindowRefSrvc, MusicGeneratorSrvc ],
  declarations: [ MainViewComponent, NumberInputFormComponent, NumberInputViewComponent ],
  bootstrap:    [ MainViewComponent ]
})
export class AppModule { }
