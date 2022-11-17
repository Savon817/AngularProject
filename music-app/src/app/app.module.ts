import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MusicListComponent } from './music-list/music-list.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MusicEditComponent } from './music-list/music-edit/music-edit.component';
import { AlbumDetailComponent } from './music-list/album-list/album-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlbumInfoComponent } from './music-list/album-list/album-info/album-info.component';
import { AuthComponent } from './shared/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner.component';
import { MusicSearchComponent } from './music-list/music-search/music-search/music-search.component';
import { ProfileComponent } from './profile/profile.component';
import { DropdownDirective } from './shared/dropdown.directive';
import { AuthInterceptor } from './shared/auth/auth-interceptor.service';
import { PlaceholderDirective } from './shared/placeholder.directive';
import { AlertComponent } from './shared/alert/alert.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MusicListComponent,
    LandingPageComponent,
    MusicEditComponent,
    AlbumDetailComponent,
    AlbumInfoComponent,
    AuthComponent,
    LoadingSpinnerComponent,
    MusicSearchComponent,
    ProfileComponent,
    DropdownDirective,
    PlaceholderDirective,
    AlertComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
