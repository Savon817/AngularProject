import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

import { Album } from "../shared/album.model";
import { Tracklist } from "../shared/trackList.model";

const CLIENT_ID = "86c3692b956f4c72a651bbc1f954c2ef";
const CLIENT_SECRET = "1d009847f7a24d009a17e5490c119cc2";
const REDIRECT_URI = "localhost:4200/musiclist/";
const BEARER_TOKEN = "BQB1GV-KmQ3fZ8Uc6DzSIniFnq1Pt7E9tW4DtC_1h27guMcn-9x5fzps39irGV2p4PCM0Fiq6MI_wq9aR1QypPuhlE-RhBlz5IjAGLYCmkZ9_kwSo9gTRAxNhl3T02vLVzgeVWFaiubp3cBOgB2kUaBDvGyXwyJPAyCF9wAclGG9YZY"

@Injectable({
  providedIn: 'root'
})
export class MusicListService{
  albumChanged = new Subject<Album[]>();
  constructor(private http: HttpClient){}

  // private album: Album[] = [
  //   new Album('MGMT', 'Time to Pretend', 'https://upload.wikimedia.org/wikipedia/en/a/aa/MGMT_-_Time_to_Pretend_EP.png',
  //   'Synthpop', 2005, [
  //     new Tracklist(1, 'Time to Pretend'),
  //     new Tracklist(2, 'Boogie Down'),
  //     new Tracklist(3, 'Destrokk'),
  //     new Tracklist(4, 'Love Always Remains'),
  //     new Tracklist(5, 'Indie Rokkers'),
  //     new Tracklist(6, 'Kids'),
  //   ]),
  //   new Album("Santigold", "I Don't Want: The Gold Fire Sessions", 'https://th.bing.com/th/id/OIP.lVQJ2yeK2i50hMQYSFCDPQHaHa?w=204&h=204&c=7&r=0&o=5&pid=1.7', "Dancehall", 2018, [
  //     new Tracklist(1, "Coo Coo Coo"),
  //     new Tracklist(2, "Run the Road"),
  //     new Tracklist(3, "Wha' You Feel Like"),
  //     new Tracklist(4, "I Don't Want"),
  //     new Tracklist(5, "Valley of the Dolls"),
  //     new Tracklist(6, "Why Me"),
  //     new Tracklist(7, "Crashing Your Party"),
  //     new Tracklist(8, "Don't Blame Me (Feat. Shenseea)"),
  //     new Tracklist(9, "A Perfect Life"),
  //     new Tracklist(10, "Gold Fire"),
  //   ])
  // ]
  private album: Album[];

  setAlbums(albums: Album[]) {
    this.album = albums;
    this.albumChanged.next(this.album.slice());
  }

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

  deleteAlbum(index: number){
    this.album.splice(index, 1);
    this.albumChanged.next(this.album.slice());
  }

  // private searchHeaders = new HttpHeaders({
  //   'Access-Control-Allow-Origin': '*',
  //   'Access-Control-Allow-Credentials': 'true',
  //   "Accept": "application/json",
  //   "Content-Type": "application/json",
  //   "Authorization": BEARER_TOKEN,
  //   "X-Requested-With": "XMLHttpRequest"
  // });

  searchMusic(result: string){
    // const query = result.split(' ').join('').toLowerCase();
    // this.http.get(`https://api.spotify.com/v1/search?q=artist%3A${result}&type=album&market=US&limit=25&offset=0`, {headers: this.searchHeaders}).subscribe(
    //   (response) => {
    //     console.log(response);
    //   }
    // );
    this.http.get(`https://cors-anywhere.herokuapp.com/https://api.deezer.com/search/album?q=${result}&output=json`).subscribe(
      (response) => {
        console.log(response);
      }
    );
  }

  albumResponse(response){
    response.docs.map((album) => {
      let artist = album.artist;
      let title = album.title;
      let genre = '';
      let coverArt;
      let trackList;
    })
  }


}
