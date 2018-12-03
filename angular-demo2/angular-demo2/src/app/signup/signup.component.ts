import { Component, OnInit } from '@angular/core';
import { SignupService } from '../signup.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  
  private response = '';

  constructor(private _router: Router, private http: HttpClient, private signupservice: SignupService) { }
  ngOnInit() {
  }
  
  signup(email, password){
     this.signupservice.createUserAccount(this.onResponse.bind(this), email, password)
  }
  
  onResponse(res: string){
    
   this.response = res;
   if (res == "Account has successfully been created"){
      this._router.navigateByUrl('userhome');
   }
}
}
