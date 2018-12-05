import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-policy',
  templateUrl: './policy.component.html',
  styleUrls: ['./policy.component.css']
})
export class PolicyComponent implements OnInit {

  private _response: Observable<any[]>;
   
  constructor(private _policyService: PolicyService) { }

  ngOnInit() {
  }
  
  getPolicies(){
      this._policyService.getPolicies(this.onResponse.bind(this));
  }
  
  savePolicies(id: string, p_one: string, p_two: string, p_three: string){
      this._policyService.updatePolicies(id, p_one, p_two, p_three, this.onResponse.bind(this));
  }
  
  getClaims(){
      this._policyService.getClaims(this.onResponse.bind(this));
  }
  onResponse(_res: Observable<any[]>){
    this._response = _res;
    }
  }
