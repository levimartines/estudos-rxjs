import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MAT_RADIO_DEFAULT_OPTIONS, MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { BasicComponent } from './basic/basic.component';
import { MatButtonModule } from '@angular/material/button';
import { OperatorsComponent } from './operators/operators.component';

@NgModule({
  declarations: [
    AppComponent,
    BasicComponent,
    OperatorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatButtonModule,
    MatRadioModule,
    FormsModule
  ],
  providers: [{
    provide: MAT_RADIO_DEFAULT_OPTIONS,
    useValue: {color: 'primary'},
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
