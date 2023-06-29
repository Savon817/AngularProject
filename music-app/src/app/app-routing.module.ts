import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingPageComponent } from './landing-page/landing-page.component';
import { AlbumInfoComponent } from './music-list/album-list/album-info/album-info.component';
import { MusicEditComponent } from './music-list/music-edit/music-edit.component';
import { MusicListComponent } from './music-list/music-list.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthComponent } from './shared/auth/auth.component';
import { AuthGuard } from './shared/auth/auth.guard';
import { LoginComponent } from './shared/auth/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: LandingPageComponent},
  {path: 'musiclist', component: MusicListComponent, children:[
    {path: 'new', component: MusicEditComponent, canActivate: [AuthGuard]},
    {path: ':id', component: AlbumInfoComponent},
    {path: ':id/edit', component: MusicEditComponent},
  ]},
  // { path: 'auth', component: AuthComponent },
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
