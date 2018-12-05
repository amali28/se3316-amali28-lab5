import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewclaims',
  templateUrl: './viewclaims.component.html',
  styleUrls: ['./viewclaims.component.css']
})
export class ViewclaimsComponent implements OnInit {

  private _response: Observable<any[]>;

  constructor(private _policyService: PolicyService) { }

  ngOnInit() {
  }
  
  getClaims(){
    this._policyService.getClaims(this.onResponse.bind(this));
  }
   onResponse(_res: Observable<any[]>){
    this._response = _res;
    }
}
