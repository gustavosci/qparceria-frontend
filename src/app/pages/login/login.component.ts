import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CredentialsDTO } from '../../model/credentials.dto';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../model/local-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  creds: CredentialsDTO = {
    username: "",
    password: ""
  }
  formLogin: FormGroup;

  constructor(public formBuilder: FormBuilder, 
              public storage: StorageService,
              public auth: AuthService,
              public route: ActivatedRoute, 
              public router: Router) { 
    this.setFormLogin(formBuilder);
  }

  ngOnInit() {
    let localUser: LocalUser = this.storage.getLocalUser();
    if(localUser){
      this.auth.refreshToken()
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        this.router.navigate(['/home']);
      }, error => {})    
    }
  }

  private setFormLogin(formBuilder: FormBuilder){
    this.formLogin = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
    });
  }
  
  public login(){
    this.auth.authenticate(this.creds)
      .subscribe(res => {
        this.auth.successfulLogin(res.headers.get('Authorization'));
        this.router.navigate(['/home']);
      },
    error => {})
  }
}
