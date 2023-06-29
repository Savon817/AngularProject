import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private authService: AuthService, private route: Router, private userService: UserService) { }

  onSubmit(){
    this.authService.login(this.loginForm.value).subscribe((res: any) => {
      if(res.success){
        this.userService.setCurrentUser(res.payload.user);
        this.route.navigate([''])
        this.authService.setToken(res.payload.token);
        console.log(res);
      }
    })
  }

  ngOnInit(): void {
  }

}
