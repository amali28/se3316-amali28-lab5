import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private response = '';
  
  constructor(private _router: Router, private http: HttpClient, private loginservice: LoginService) { }
  ngOnInit() {
  }
  
  login(email, password){
     this.loginservice.validateAccountLogin(this.onResponse.bind(this), email, password)
  }
  
  signup(){
    this._router.navigateByUrl('signup');
  }
  
  onResponse(res: string, userID: string){
   this.response = res;
   console.log(res);
   if (res == "Go verify!"){
       this._router.navigateByUrl('resend/:id');
   } else if (res == "Logged in!"){
       this._router.navigateByUrl('userhome/' + userID);
   } else if (res == "Empty email has been entered" || res == "Empty password has been entered"){
        alert("Enter valid credentials.");
   } else if (res == "Admin!") {
       this._router.navigateByUrl('admindash/'+ userID);
   } else if (res == "User disabled"){
       alert("Your account was disabled by an admin. Contact amali28@uwo.ca to resolve this deactivation.");
   }
   
}
}
