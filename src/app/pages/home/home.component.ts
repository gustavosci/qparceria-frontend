import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../model/local-user';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public storage: StorageService, public route: ActivatedRoute, public router: Router) {    
  }

  ngOnInit() {
    let userLogged: LocalUser = this.storage.getLocalUser();
    if(!userLogged){
      this.router.navigate(['/login']);
    }
  }
  
}
