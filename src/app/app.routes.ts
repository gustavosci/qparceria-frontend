import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { ActivityComponent } from './pages/activity/activity.component';
import { SearchComponent } from './pages/search/search.component';
import { ConsultComponent } from './pages/consult/consult.component';
import { MatchComponent } from './pages/match/match.component';

// Uma constante que recebe um array do tipo Routes
const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'activity', component: ActivityComponent },
    { path: 'activity/:id', component: ActivityComponent },
    { path: 'search', component: SearchComponent },
    { path: 'consult', component: ConsultComponent },
    { path: 'consult/:id', component: ConsultComponent },
    { path: 'match', component: MatchComponent },
    { path: 'match/:consult', component: MatchComponent },
    { path: '**', component: HomeComponent }
];

export const routing = RouterModule.forRoot(appRoutes);

