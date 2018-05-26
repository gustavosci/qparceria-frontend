import { BrowserModule } from '@angular/platform-browser';
import { routing } from './app.routes';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { HeaderComponent } from './global/header/header.component';
import { FooterComponent } from './global/footer/footer.component';
import { ActivityComponent } from './pages/activity/activity.component';

import { PanelActivityModule } from './global/panelactivity/panelactivity.module';
import { SimpleListActModule } from './global/simplelistact/simplelistact.module';

import  { AppMaskDirective } from './directives/appmask.directive';

import 'rxjs/add/operator/map';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AuthService } from './services/auth.service';
import { UserService } from './services/domain/user.service';
import { ActivityService } from './services/domain/activity.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ErrorInterceptorProvider } from './interceptor/error-interceptor';
import { StorageService } from './services/storage.service';
import { AuthInterceptorProvider } from './interceptor/auth-interceptor';
import { SearchComponent } from './pages/search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CadastroComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    ActivityComponent,
    SearchComponent,
    AppMaskDirective
  ],
  imports: [
    BrowserModule,
    HttpModule, 
    routing,        
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PanelActivityModule,
    SimpleListActModule
  ],
  providers: [
    AuthService,
    UserService,
    ActivityService,
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    StorageService    
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
