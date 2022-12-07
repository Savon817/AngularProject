import { Component, OnInit } from '@angular/core';
import { AuthService } from './shared/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService){}

  title = 'music-app';
  imgPath = 'https://i.discogs.com/kouW-_83Tavb9vv2Yt7Axd6L__8866h7n7tRLjWjQpc/rs:fit/g:sm/q:90/h:600/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTE4MTI5/NjcwLTE2MTc0MjIx/NDgtMzQzNC5qcGVn.jpeg';

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
