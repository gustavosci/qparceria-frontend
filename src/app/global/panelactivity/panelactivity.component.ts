import { Component, OnInit, Input } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-panelactivity',
  templateUrl: './panelactivity.component.html',
  styleUrls: ['./panelactivity.component.css']
})
export class PanelActivityComponent implements OnInit {

  @Input() title: string;

  constructor() { }

  ngOnInit() {    
  }

}
