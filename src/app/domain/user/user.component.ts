import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  id;
  @Input() name: string;
  @Input() username: string;
  @Input() email: string;
  @Input() password: string;
  @Input() gender: string;
  @Input() birthDate: string;
  @Input() facebook: string;
  @Input() twitter: string;
  @Input() instagram: string;
  @Input() strava: string;
  @Input() pic: string;
  adressId;
  @Input() street: string;  
  @Input() number;
  @Input() neighborhood: string;
  @Input() complement: string;
  @Input() cep;  
  @Input() cityId;
  @Input() phone: string;
  @Input() run: boolean;
  @Input() walk: boolean;
  @Input() cyclism: boolean;

}