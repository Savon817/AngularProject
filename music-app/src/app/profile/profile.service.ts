import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { map, tap } from "rxjs/operators";


import { MusicListService } from "../music-list/music-list.service";
import { Album } from "../shared/album.model";

@Injectable({providedIn: 'root'})
export class ProfileService{
  albumChanged = new Subject<Album[]>();
  private album: Album[];

  constructor(private http: HttpClient, private mlService: MusicListService){}

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


  storeProfileAlbum(){
    const albums = this.mlService.getAlbums();
    this.http.put('https://music-bookmark-5b727-default-rtdb.firebaseio.com/profileAlbums.json', albums).subscribe(response => {
      console.log(response);
    });
  }

  fetchProfileAlbum(){
   return this.http.get<Album[]>('https://music-bookmark-5b727-default-rtdb.firebaseio.com/profileAlbums.json').pipe(
      map(albums => {
        return albums.map( album => {
          return {...album, trackList: album.trackList ? album.trackList : []
          }
        });
      }),
      tap(albums => {
        this.mlService.setAlbums(albums);
      })
    )
  }
}
