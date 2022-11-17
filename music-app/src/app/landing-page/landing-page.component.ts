import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

const CLIENT_ID = "86c3692b956f4c72a651bbc1f954c2ef";
const CLIENT_SECRET = "1d009847f7a24d009a17e5490c119cc2";
const REDIRECT_URI = "localhost:4200/musiclist/";

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  imgPath: string = '../../assets/images/Screenshot 2022-11-17 123222.png'
  altTitle: string = 'Sample Web Image'

  constructor(private http: HttpClient) { }
  // const music = MusicKit.getInstance();
  ngOnInit(): void {
  }

}
