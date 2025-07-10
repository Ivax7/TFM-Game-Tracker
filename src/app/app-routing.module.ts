import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';

const routes: Routes = [
  { 
    path: '', 
    component: GameListComponent,
    pathMatch: 'full'
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  { 
    path: 'register', 
    component: RegisterComponent 
  },
  { 
    path: 'games', 
    redirectTo: '',
    pathMatch: 'full'
  },
  { 
    path: 'game/:id', 
    component: GameDetailComponent
  },
  { 
    path: 'search/:query',
    component: SearchResultComponent
  },
  { 
    path: 'profile',
    component: UserProfileComponent
  },
  // { 
  //   path: '**', 
  //   component: GameListComponent
  // },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
