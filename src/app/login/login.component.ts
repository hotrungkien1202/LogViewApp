import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private router: Router) { }
  username: string;
  password: string;
  message : string;
  isWarning: boolean = false;
  subcription: Subscription;
  ngOnInit() {
    this.message= "Some message goes here"
  }

  setClassToMessage(){
    return this.isWarning == true ? 'text-danger text-center': 'text-success text-center'
  }

  isLogin(){
    if(this.isNullOrUndifined(this.username) || this.isNullOrUndifined(this.password)){
      this.message = "Username or password is blank"
      this.isWarning = true;
    }
    else{
      if(this.username.toLowerCase() == "fdx" && this.password == "fdx@12345"){
        sessionStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('isLoggedIn', 'true')
        console.log(localStorage);
        return true;
      }
      this.message = "Username or password is incorrect"
      this.isWarning = true;
      this.username = '';
      this.password = '';
    }
    return false;
  }

  login(){
    if(this.isLogin()){
      this.router.navigate(['/home']);
    }
  }

  isNullOrUndifined(val: any){
    if(val == null || val == undefined){
      return true;
    }
    return false;
  }
}
