import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/domain/user.service";
import { StorageService } from '../../services/storage.service';
import { ActivatedRoute, Router } from "@angular/router";
import { UserDTO } from '../../model/user.dto';
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';

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
  userService: UserService;
  storage: StorageService;
  route: ActivatedRoute;
  router: Router;

  constructor(userService: UserService, storage: StorageService, formBuilder: FormBuilder, route: ActivatedRoute, router: Router){
    this.userService = userService;
    this.storage = storage;
    this.router = router;
    this.route = route;
    this.setFormCadastro(formBuilder);    
  }

  ngOnInit() {    
    let userLogged: LocalUser = this.storage.getLocalUser();
    if(userLogged && userLogged.username){
      this.setUserByUsername(userLogged.username);
    }
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

  setUserByUsername(username: string){    
    
    this.userService
    .findByUsername(username)
    .subscribe(
        user => {
            this.user = user;
        },
        erro => { 
           if(erro.status === 403){
            this.router.navigate(['/login']);
           }            
        }
    );
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
    /*
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
      */
  }

  private markFieldsTouched() {
    Object.keys(this.formCadastro.controls).forEach(field => {
      const control = this.formCadastro.get(field);
      control.markAsTouched();
    })
  }
}