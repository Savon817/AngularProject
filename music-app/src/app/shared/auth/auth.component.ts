import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode = false;

  onSubmit(form: NgForm){
    console.log(form);
    if(this.isLoginMode){

    }else{

    }
  }


  constructor() { }

  ngOnInit(): void {
  }

}