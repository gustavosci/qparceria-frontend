import { Component, OnInit, Input } from '@angular/core';
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';

@Component({
  moduleId: module.id,
  selector: 'app-simplelistact',
  templateUrl: './simplelistact.component.html',
  styleUrls: ['./simplelistact.component.css']
})
export class SimpleListActComponent implements OnInit {

  @Input() sport: string;
  @Input() ufstart: string;
  @Input() citystart: string;
  @Input() ufend: string;
  @Input() cityend: string;
  @Input() timestart: string;
  @Input() frequency: string;
  @Input() response: string;

  constructor() { }

  ngOnInit() {
  }

}
