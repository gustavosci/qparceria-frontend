import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "../../services/domain/user.service";
import { ActivatedRoute, Router } from "@angular/router";
import { UserDTO } from '../../model/user.dto';
import { StorageService } from '../../services/storage.service';
import { LocalUser } from '../../model/local-user';
import { STORAGE_KEYS } from '../../config/storage-keys.config';
import { UFService } from '../../services/domain/uf.service';
import { UFDTO } from '../../model/uf.dto';
import { CityDTO } from '../../model/city.dto';

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
    gender: "MASCULINO",
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
    cityId: "1",
    ufId: "1",
    phone: "",
    run: false,
    walk: false,
    cyclism: false
  };
  formCadastro: FormGroup;
  newUser: boolean;

  ufs: UFDTO[];
  cities: CityDTO[];

  constructor(public userService: UserService, 
              public storage: StorageService,
              public formBuilder: FormBuilder,
              public route: ActivatedRoute,
              public router: Router,
              public ufService: UFService) {   
  }

  ngOnInit() {   
    this.getAllUfs();
    this.loadUserLogged();
    this.loadFormCadastro();    
  }

  private getAllUfs(){
    this.ufService.getUFs()
      .subscribe(ufs => {
        this.ufs = ufs;
        this.user.ufId = ufs[0].id;
        this.updateCities(this.user.ufId, true);
      })
  }

  private updateCities(ufId: string, updCity: boolean){
    this.ufService.getCitiesByUF(ufId)
      .subscribe(cities => {
        this.cities = cities;
        if(updCity){
          this.user.cityId = cities[0].id;
        }        
      })    
  }

  private loadUserLogged(){
    this.newUser = true;
    let userLogged: LocalUser = this.storage.getLocalUser();
    if(userLogged && userLogged.username){
      this.setUserByUsername(userLogged.username);
    }
  }

  private loadFormCadastro(){
    this.formCadastro = this.formBuilder.group({
        name: ['', Validators.compose([Validators.required, Validators.minLength(5)])],
        username: ['', Validators.compose([Validators.required])],
        email: ['', Validators.compose([Validators.required, Validators.email])],
        password: [''], // incluir Validators.compose([Validators.required]) posteriormente
        gender: [''],
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
        ufId: [''],
        cityId: [''],
        phone: [],
        run: [],
        walk: [],
        cyclism: [],
    });
  }

  private setUserByUsername(username: string){        
    this.userService
    .findByUsername(username)
    .subscribe(
        user => {
            this.updateCities(user.ufId, false);

            // ver porque nao atualiza a combo
            console.log("user: " + user.cityId);
            this.user = user;
            this.newUser = false;            
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
    this.userService.save(this.user)
      .subscribe(res => {
        if(this.newUser){
          alert("Parabéns, o usuário incluído com sucesso!\nVocê será encaminhado para a página de login :)");
          this.router.navigate(['/login']);
        } else {
          alert("Alteração feita com sucesso :)");
          this.router.navigate(['']);
        }
      }, error => {
        if(!this.newUser && error.status === 403){
          alert('Sessão expirada!\nFavor logar novamente para efetuar as alterações.');
        }
      })
  }

  private markFieldsTouched() {
    Object.keys(this.formCadastro.controls).forEach(field => {
      const control = this.formCadastro.get(field);
      control.markAsTouched();
    })
  }
}