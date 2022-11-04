import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Album } from "../shared/album.model";
import { Tracklist } from "../shared/trackList.model";

const CLIENT_ID = "86c3692b956f4c72a651bbc1f954c2ef";
const CLIENT_SECRET = "1d009847f7a24d009a17e5490c119cc2";
const REDIRECT_URI = "localhost:4200/musiclist/";

@Injectable({
  providedIn: 'root'
})
export class MusicListService{
  albumChanged = new Subject<Album[]>();
  constructor(private http: HttpClient){}

  private album: Album[] = [
    new Album('MGMT', 'Time to Pretend', 'https://upload.wikimedia.org/wikipedia/en/a/aa/MGMT_-_Time_to_Pretend_EP.png',
    'Synthpop', 2005, [
      new Tracklist(1, 'Time to Pretend'),
      new Tracklist(2, 'Boogie Down'),
      new Tracklist(3, 'Destrokk'),
      new Tracklist(4, 'Love Always Remains'),
      new Tracklist(5, 'Indie Rokkers'),
      new Tracklist(6, 'Kids'),
    ]),
    new Album("Santigold", "I Don't Want: The Gold Fire Sessions", 'https://th.bing.com/th/id/OIP.lVQJ2yeK2i50hMQYSFCDPQHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7', "Dancehall", 2018, [
      new Tracklist(1, "Coo Coo Coo"),
      new Tracklist(2, "Run the Road"),
      new Tracklist(3, "Wha' You Feel Like"),
      new Tracklist(4, "I Don't Want"),
      new Tracklist(5, "Valley of the Dolls"),
      new Tracklist(6, "Why Me"),
      new Tracklist(7, "Crashing Your Party"),
      new Tracklist(8, "Don't Blame Me (Feat. Shenseea)"),
      new Tracklist(9, "A Perfect Life"),
      new Tracklist(10, "Gold Fire"),
    ])
  ]
  // private album: Album[];

  getAlbums(){
    return this.album.slice();
  }

  getAlbum(index: number){
    return this.album[index];
  }

  addAlbum(album: Album){
    this.album.push(album);
    this.albumChanged.next(this.album.slice());
  }

  updateAlbum(index: number, newAlbum: Album){
    this.getAlbums[index] = newAlbum;
    this.albumChanged.next(this.album.slice());
  }

  searchMusic(result?: string){
    // const query = result.split(' ').join('').toLowerCase();
    this.http.get(`https://api.spotify.com/v1/search?type=album:Nas`).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }


}
