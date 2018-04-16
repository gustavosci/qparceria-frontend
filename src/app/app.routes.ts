import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';

// Uma constante que recebe um array do tipo Routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

