import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MusicListService } from '../../music-list.service';

@Component({
  selector: 'app-music-search',
  templateUrl: './music-search.component.html',
  styleUrls: ['./music-search.component.css']
})
export class MusicSearchComponent implements OnInit {

  constructor(private musiclist: MusicListService) { }

  ngOnInit(): void {
  }

  onSubmit(musicSearchForm: NgForm){
    console.log(musicSearchForm.value);
    this.musiclist.searchMusic(musicSearchForm.value.search);
  }
}
