import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm = new FormGroup({
    email: new FormControl(''),
    phone: new FormControl(''),
    first_name: new FormControl(''),
    last_name: new FormControl(''),
    password: new FormControl(''),
    password_confirmation: new FormControl(''),
    username: new FormControl('')
  });


  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
  }

  onSubmit(){
    this.authService.signup(this.signupForm.value).subscribe((res: any) => {
      if(res.success){
        this.route.navigate(['/login']);
      }
    })
    console.log(this.signupForm.value);
  }

}
