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
  
 
  onResponse(res: string){
    
   this.response = res;
   if (res == "Logged in!"){
      this._router.navigateByUrl('userhome');
   }
   if (res == "This account does not exist"){
       alert("This account does not exist. Please check the information entered");
   }
}
}
