import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameListComponent } from './components/game-list/game-list.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { UserProfileComponent } from './components/authentication/user-profile/user-profile.component';
import { WishlistComponent } from './components/authentication/user-profile/wishlist/wishlist.component';
import { ListsComponent } from './components/authentication/user-profile/lists/lists.component';
import { GameActionButtonsComponent } from './components/game-action-buttons/game-action-buttons.component';
import { PlaytimeDisplayComponent } from './components/playtime-display/playtime-display.component';
import { GameCardBodyComponent } from './components/game-card-body/game-card-body.component';
import { BeatenComponent } from './components/authentication/user-profile/status/beaten/beaten.component';
import { CompletedComponent } from './components/authentication/user-profile/status/completed/completed.component';
import { AbandonedComponent } from './components/authentication/user-profile/status/abandoned/abandoned.component';
import { PlayingComponent } from './components/authentication/user-profile/status/playing/playing.component';
import { FiltersComponent } from './components/filters/filters.component';
import { TrendingPageComponent } from './components/trending-page/trending-page.component';
import { ReviewComponent } from './components/review/review.component';

@NgModule({
  declarations: [
    AppComponent,
    GameListComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    SearchBarComponent,
    GameDetailComponent,
    SearchResultComponent,
    UserProfileComponent,
    WishlistComponent,
    ListsComponent,
    GameActionButtonsComponent,
    PlaytimeDisplayComponent,
    GameCardBodyComponent,
    BeatenComponent,
    CompletedComponent,
    AbandonedComponent,
    PlayingComponent,
    FiltersComponent,
    TrendingPageComponent,
    ReviewComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
