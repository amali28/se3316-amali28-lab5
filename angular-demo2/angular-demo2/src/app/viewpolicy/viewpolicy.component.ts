import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewpolicy',
  templateUrl: './viewpolicy.component.html',
  styleUrls: ['./viewpolicy.component.css']
})
export class ViewpolicyComponent implements OnInit {

  private _response: Observable<any[]>;

  constructor(private _policyService: PolicyService) { }

  ngOnInit() {
      this._policyService.getPolicies(this.onResponse.bind(this));
    
  }
  

  onResponse(_res: Observable<any[]>){
    this._response = _res;
    }

}
