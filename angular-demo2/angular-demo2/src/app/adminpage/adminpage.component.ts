import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-adminpage',
  templateUrl: './adminpage.component.html',
  styleUrls: ['./adminpage.component.css']
})
export class AdminpageComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }
  
  logOut(){
    this._router.navigateByUrl('login');
  }

}
