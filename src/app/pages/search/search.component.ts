import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';
import { PanelActivityComponent } from '../../global/panelactivity/panelactivity.component';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';
import { ActivityService } from '../../services/domain/activity.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  sportId: string = "1";
  ufStartId: string = "1";
  cityStartId: string = "1";

  acts: ActivitySimpleConsultDTO[] = [];

  formSearch: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              public actService: ActivityService) {   
  }

  ngOnInit() {
    this.setFormSearch();
  }

  private setFormSearch(){
    this.formSearch = this.formBuilder.group({
        sportId: ['1'],
        ufStartId: ['1'],
        cityStartId: ['1']
    });
  }

  submit(event){
    this.actService
    .search(this.sportId, this.cityStartId)
    .subscribe(
        acts => {
            this.acts = acts;
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
  }

  detailActivity(act: ActivitySimpleConsultDTO){    
    this.router.navigate(['/consult/' + act.id]);    
  }
}
