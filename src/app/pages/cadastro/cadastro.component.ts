import { Component, OnInit, Input } from '@angular/core';
import { UserComponent } from '../../domain/user/user.component';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  moduleId: module.id,
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: UserComponent = new UserComponent();
  uf;
  formCadastro: FormGroup;
  service: UserService;
  route: ActivatedRoute;
  router: Router;

  constructor(service: UserService, formBuilder: FormBuilder, route: ActivatedRoute, router: Router){
    this.setService(service);
    this.setRouter(router);
    this.setRoute(route);        
    this.setFormCadastro(formBuilder);
  }

  ngOnInit() {
  }

  setService(service: UserService){
    this.service = service;
  }

  setRouter(router){
    this.router = router;
  }

  setRoute(route: ActivatedRoute){
    this.route = route;
    this.route.params.subscribe(params => {
        let id = params["id"];
        if(id){
            this.setUserById(id);
        }
    })
  }

  setUserById(id: string){
    this.service
    .findById(id)
    .subscribe(
        user => {
            this.user = user;
        },
        erro => {
            console.log(erro);
            alert("Usuário não encontrado!");
            this.router.navigate(['']);
        }
    );
  }

  setFormCadastro(formBuilder: FormBuilder){
    this.formCadastro = formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        username: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: ['', Validators.compose([Validators.required])],
        gender: [],
        birthDate: [],
        facebook: [],
        twitter: [],
        instagram: [],
        strava: [],
        pic: [],
        street: [],
        number: [],
        neighborhood: [],
        complement: [],
        cep: [],
        uf: [],
        cityId: [],
        phone: [],
        run: [],
        walk: [],
        cyclism: [],
    });
  }

  save(event){        
    event.preventDefault();
    this.service.save(this.user).
      then(res => {
        console.log(res);
        this.user = new UserComponent();
        this.router.navigate(['/login']);
      }).
      catch(err => {
        console.log(err);
      })
  }


}
