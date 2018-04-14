import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/domain/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDTO } from '../../model/user.dto';


@Component({
  moduleId: module.id,
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  user: UserDTO = {
    id: "",
    name: "",
    username: "",
    email: "",
    password: "",
    birthDate: "",
    gender: "",
    facebook: "",
    twitter: "",
    instagram: "",
    strava: "",
    pic: "",
    adressId: "",
    street: "",  
    number: "",
    neighborhood: "",
    complement: "",
    cep: "",  
    cityId: "",
    phone: "",
    run: false,
    walk: false,
    cyclism: false
  };
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
        gender: ['', Validators.compose([Validators.required])],
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
        uf: ['', Validators.compose([Validators.required])],
        cityId: ['', Validators.compose([Validators.required])],
        phone: [],
        run: [],
        walk: [],
        cyclism: [],
    });
  }

  submit(event) {        
    event.preventDefault();
    if(this.formCadastro.valid){
      this.save();
    } else {
      alert('Existem campos inválidos! Por favor, ajuste-os e envie novamente.');
      this.markFieldsTouched();
    }
  }

  private save() {
    this.service.
    save(this.user).
      subscribe(res => {
        console.log(res);
        alert(res.msg + ' Agora você será levado para a página de Login :)');
        this.router.navigate(['/login']);
      }, err => {
        console.log(err);
        let errAlert = 'Erro na inclusão de usuário: ';
        try{
          console.log(err._body);
          let errJson = JSON.parse(err._body.Json());
          errAlert += errJson.msg;
        }
        catch{
          errAlert += err;
        }
        alert(errAlert);
      });  
  }

  private markFieldsTouched() {
    Object.keys(this.formCadastro.controls).forEach(field => {
      const control = this.formCadastro.get(field);
      control.markAsTouched();
    })
  }
}