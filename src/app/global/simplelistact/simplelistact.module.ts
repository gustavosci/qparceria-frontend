import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimpleListActComponent } from './simplelistact.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ SimpleListActComponent ],
  exports: [SimpleListActComponent]
})
export class SimpleListActModule { }
