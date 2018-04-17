import { Component, OnInit } from '@angular/core';
import { LocalUser } from '../../model/local-user';
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public auth: AuthService, 
              public storage: StorageService,
              public route: ActivatedRoute,
              public router: Router) {    
  }

  ngOnInit() {
    let localUser: LocalUser = this.storage.getLocalUser();
    if(localUser){
      this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
      },
      error => {
        this.router.navigate(['/login']);
      })    
    } else {
      this.router.navigate(['/login']);
    }
  }  
}
