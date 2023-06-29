import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { AuthService } from '../shared/auth/auth.service'
import { DataStorageService } from '../shared/data-storage.service';
import { UserService } from '../shared/auth/user.service';
import { User } from '../shared/auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSub: Subscription;
  // isLoggedIn: boolean = false;
  currentUser: User = null;

  constructor( private authService: AuthService, private userService: UserService) {}

  ngOnInit(): void {
    this.userSub = this.authService.user.subscribe( user => {
      console.log(user);
      this.currentUser = user;
    });
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
