import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';


import { Album } from '../shared/album.model';
import { AuthService } from '../shared/auth/auth.service';
import { MusicListService } from './music-list.service';

@Component({
  selector: 'app-music-list',
  templateUrl: './music-list.component.html',
  styleUrls: ['./music-list.component.css']
})
export class MusicListComponent implements OnInit, OnDestroy {
  albums: Album[] = [];
  subscription: Subscription;
  private userSub: Subscription;
  isLoggedIn: boolean = false;

  constructor(
    private musicListService: MusicListService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      this.isLoggedIn = !!user
    })
    this.subscription = this.musicListService.albumChanged.subscribe(
      (albums: Album[]) => {
        this.albums = albums;
      }
    );
    this.albums = this.musicListService.getAlbums();
  }

  onNewAlbum(){
    this.router.navigate(['new'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }
}
