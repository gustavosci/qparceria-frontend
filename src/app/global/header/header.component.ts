import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public storage: StorageService,
              public route: ActivatedRoute,
              public router: Router){
  }

  ngOnInit() {
  }

  logout(){
    console.log("caiu aqui");
    //this.storage.setLocalUser(null);
    //this.router.navigate(['/login']);
  }

}
