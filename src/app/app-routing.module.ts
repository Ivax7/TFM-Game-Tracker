import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { TrendingPageComponent } from './components/trending-page/trending-page.component';
import { WishlistComponent } from './components/authentication/user-profile/wishlist/wishlist.component';
import { CollectionStatusComponent } from './components/authentication/user-profile/collection-status/collection-status.component';
import { ListsComponent } from './components/authentication/user-profile/lists/lists.component';
import { SettingsComponent } from './components/authentication/user-profile/settings/settings.component';
import { AppsComponent } from './components/footer/apps/apps.component';
import { SuggestionsComponent } from './components/footer/suggestions/suggestions.component';
import { VisitedUserProfileComponent } from './components/visited-user-profile/visited-user-profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';

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
    path: 'trending', 
    component: TrendingPageComponent 
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
    path:'users/:id',
    component: VisitedUserProfileComponent 
  },
  {
    path:'users',
    component: UsersListComponent
  },
  { 
    path: 'search/:query',
    component: SearchResultComponent
  },
  { 
    path: 'profile',
    component: UserProfileComponent
  },
  { 
    path: 'wishlist',
    component: WishlistComponent
  },
  { 
    path: 'collection',
    component: CollectionStatusComponent
  },
  { 
    path: 'lists',
    component: ListsComponent
  },
  { 
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: 'apps',
    component: AppsComponent
  },
  {
    path: 'suggestions',
    component: SuggestionsComponent
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
