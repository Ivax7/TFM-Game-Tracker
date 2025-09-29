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
import { UserStatsComponent } from './components/authentication/user-profile/user-stats/user-stats.component';
import { RatingsComponent } from './components/authentication/user-profile/profile/ratings/ratings.component';
import { ReviewsComponent } from './components/authentication/user-profile/profile/reviews/reviews.component';
import { NgChartsModule } from 'ng2-charts';
import { CollectionStatusComponent } from './components/authentication/user-profile/collection-status/collection-status.component';
import { CollectionStatusChartComponent } from './components/authentication/user-profile/collection-status/collection-status-chart/collection-status-chart.component';
import { SettingsComponent } from './components/authentication/user-profile/settings/settings.component';
import { ImageCropperComponent } from 'ngx-image-cropper';
import { SettingsAccountComponent } from './components/authentication/user-profile/settings/settings-account/settings-account.component';
import { SettingsProfileComponent } from './components/authentication/user-profile/settings/settings-profile/settings-profile.component';
import { SettingsEmailComponent } from './components/authentication/user-profile/settings/settings-email/settings-email.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppsComponent } from './components/footer/apps/apps.component';
import { SuggestionsComponent } from './components/footer/suggestions/suggestions.component';
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
    UserStatsComponent,
    RatingsComponent,
    ReviewsComponent,
    CollectionStatusComponent,
    CollectionStatusChartComponent,
    SettingsComponent,
    SettingsAccountComponent,
    SettingsProfileComponent,
    SettingsEmailComponent,
    FooterComponent,
    AppsComponent,
    SuggestionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgChartsModule,
    ImageCropperComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
