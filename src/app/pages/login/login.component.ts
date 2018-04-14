import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { CredentialsDTO } from '../../model/credentials.dto';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from "@angular/router";

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
  auth: AuthService;
  route: ActivatedRoute;
  router: Router;

  constructor(formBuilder: FormBuilder, auth: AuthService, route: ActivatedRoute, router: Router) { 
    this.setFormLogin(formBuilder);
    this.setAuth(auth);
    this.setRouter(router);
    this.setRoute(route);        
  }

  ngOnInit() {
  }

  private setFormLogin(formBuilder: FormBuilder){
    this.formLogin = formBuilder.group({
        username: ['', Validators.compose([Validators.required])],
        password: ['', Validators.compose([Validators.required])]
    });
  }

  private setAuth(auth: AuthService){
    this.auth = auth;
  }

  private setRouter(router){
    this.router = router;
  }

  private setRoute(route: ActivatedRoute){
    this.route = route;
  }

  public login(){
    this.auth.authenticate(this.creds)
      .subscribe(res => {
        console.log(res.headers.get('Authorization'));
        this.router.navigate(['/home']);
      },
    error => {})
  }
}
