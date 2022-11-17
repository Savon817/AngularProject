import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { MusicListService } from '../music-list.service';

@Component({
  selector: 'app-music-edit',
  templateUrl: './music-edit.component.html',
  styleUrls: ['./music-edit.component.css']
})
export class MusicEditComponent implements OnInit {
  albumEditForm: FormGroup;
  editMode = false;
  id: number;

  constructor(
    private route: ActivatedRoute,
    private musicListService: MusicListService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.formInit();
      }
    );
  }

  onSubmit(){
    if(this.editMode){
      this.musicListService.updateAlbum(this.id, this.albumEditForm.value);
    } else {
      this.musicListService.addAlbum(this.albumEditForm.value);
    }
    this.onCancel();
  }

  onAddTrack(){
    (<FormArray>this.albumEditForm.get('trackList')).push(
      new FormGroup({
        'trackNumber': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)]),
        'trackName': new FormControl(null, Validators.required)
      })
    )
  }

  onDeleteTrack(index: number){
    (<FormArray>this.albumEditForm.get('trackList')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  get controls(){
    return (<FormArray>this.albumEditForm.get('trackList')).controls;
  }

  private formInit(){
    let albumArtist = '';
    let albumTitle = '';
    let albumGenre = '';
    let albumYear: number;
    let albumCover = '';
    let albumTracks = new FormArray([]);

    if(this.editMode){
      const album = this.musicListService.getAlbum(this.id);
      albumArtist = album.artist;
      albumTitle = album.title;
      albumGenre = album.genre;
      albumYear = album.releaseYear;
      albumCover = album.coverArt;
      if(album['trackList']){
        for (let tracks of album.trackList){
          albumTracks.push(
            new FormGroup({
              'trackOrder': new FormControl(tracks.trackOrder),
              'trackName': new FormControl(tracks.trackName)
            })
          );
        }
      }
    }

    this.albumEditForm = new FormGroup({
      'artist': new FormControl(albumArtist, Validators.required),
      'title': new FormControl(albumTitle, Validators.required),
      'genre': new FormControl(albumGenre, Validators.required),
      'rlYear': new FormControl(albumYear, Validators.required),
      'cover': new FormControl(albumCover, Validators.required),
      'trackList': albumTracks
    });
  }
}
