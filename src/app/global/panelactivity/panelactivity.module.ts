import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelActivityComponent } from './panelactivity.component'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ PanelActivityComponent],
  exports: [ PanelActivityComponent ] 
})
export class PanelActivityModule { }
