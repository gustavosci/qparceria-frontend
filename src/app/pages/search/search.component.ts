import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivitySimpleConsultDTO } from '../../model/activitysimpleconsult.dto';
import { PanelActivityComponent } from '../../global/panelactivity/panelactivity.component';
import { SimpleListActComponent } from '../../global/simplelistact/simplelistact.component';
import { ActivityService } from '../../services/domain/activity.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';
import { SportService } from '../../services/domain/sport.service';
import { SportDTO } from '../../model/sport.dto';
import { UFService } from '../../services/domain/uf.service';
import { UFDTO } from '../../model/uf.dto';
import { CityDTO } from '../../model/city.dto';
import { MatchService } from '../../services/domain/match.service';
import { ActivitySearchDTO } from '../../model/activitysearch.dto';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  sportId: string = "1";
  ufStartId: string = "1";
  cityStartId: string = "1";
  maxDistance: string = "100.00";
  maxAverage: string = "100.00";
  includesOwn: boolean = false;

  ufs: UFDTO[];
  cities: CityDTO[];
  acts: ActivitySearchDTO[] = [];
  sports: SportDTO[];
  userLogged: LocalUser;

  formSearch: FormGroup;

  constructor(public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              public actService: ActivityService,
              public storage: StorageService,
              public ufService: UFService,
              public sportService: SportService,
              public matchService: MatchService) {   
  }

  ngOnInit() {
    this.getAllSports();
    this.getAllUfs();
    this.getUserLoggedData();
    this.setFormSearch();
  }

  private getAllSports(){
    this.sportService.getSports()
    .subscribe(sports => {
      this.sports = sports;
    })
  }

  private getAllUfs(){
    this.ufService.getUFs()
      .subscribe(ufs => {
        this.ufs = ufs;
        this.updateCities(this.ufStartId, false);
      })
  }

  private updateCities(ufId: string, updCity: boolean){
    this.ufService.getCitiesByUF(ufId)
      .subscribe(cities => {
        this.cities = cities;
        if(updCity){
          this.cityStartId = this.cities[0].id;
        }
      })    
  }

  private getUserLoggedData(){
    this.userLogged = this.storage.getLocalUser();
    if(this.userLogged){
      this.updateCities(this.userLogged.ufId, false);
      this.ufStartId = this.userLogged.ufId;
      this.cityStartId = this.userLogged.cityId;      
    }
  }

  private setFormSearch(){
    let doubleRE: string = "[0-9]*\\.?[0-9]?[0-9]?";
    let integerRE: string = "[0-9]+";
    this.formSearch = this.formBuilder.group({
        sportId: [''],
        ufStartId: [''],
        cityStartId: [''],
        maxDistance: ['', [Validators.pattern(doubleRE)]],
        maxAverage: ['', [Validators.pattern(doubleRE)]],
        includesOwn: ['']
    });
  }

  submit(event){
    this.actService
    .search(this.sportId, this.cityStartId, this.maxDistance, this.maxAverage, this.includesOwn)
    .subscribe(
        acts => {
            this.acts = acts;       
            if(!this.acts[0]){
              alert("Não foram encontradas atividades para estes filtros :(")
            }     
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
  }

  detailActivity(act: string){    
    this.router.navigate(['/consult/' + act]);    
  }

  match(act: ActivitySearchDTO){    
    this.matchService
      .insert(act.act.id)
      .subscribe(
        res => {
          this.updateUserMatcherOfAct(act.act.id, false);
          this.reinderizaPage();
          alert("Match realizado com sucesso! Aproveite a atividade :)");          
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
  }

  undoMatch(act: ActivitySearchDTO){    
    this.matchService
      .undo(act.act.id)
      .subscribe(
        res => {
          this.updateUserMatcherOfAct(act.act.id, true);
          this.reinderizaPage();
          alert("Match desfeito com sucesso! Encontre outras atividades :)");
        },
        err => { 
           if(err.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
  }

  private updateUserMatcherOfAct(idAct: string, undo: boolean){
    this.acts.forEach((act) => {
      if(act.act.id == idAct){
        if(undo){
          act.userLoggedMatcher = false;
        } else {
          act.userLoggedMatcher = true;
        }
        return;
      }
    })
  }

  private reinderizaPage(){
    let acts = this.acts;
    this.acts = null;
    this.acts = acts;
  }

}
