import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  login(email, password){
      console.log(email);
      console.log(password);
  }
  
  signup(){
    this._router.navigateByUrl('signup');
  }

}
