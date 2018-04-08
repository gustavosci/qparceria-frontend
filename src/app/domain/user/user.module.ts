import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { UserService } from '../../services/user.service';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    UserComponent
  ],
  exports: [
    UserComponent
  ],
  providers: [
    UserService
  ]
})

export class UserModule { }
