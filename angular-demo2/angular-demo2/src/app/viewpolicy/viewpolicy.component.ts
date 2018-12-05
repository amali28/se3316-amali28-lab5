import { Component, OnInit } from '@angular/core';
import { PolicyService } from '../policy.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-viewpolicy',
  templateUrl: './viewpolicy.component.html',
  styleUrls: ['./viewpolicy.component.css']
})
export class ViewpolicyComponent implements OnInit {

  private _response = '';

  constructor(private _policyService: PolicyService) { }

  ngOnInit() {
      this._policyService.getPolicies(this.onResponse.bind(this));
  }
  
  createClaim(claimName: string, claimDescription: string){
      this._policyService.createClaim(this.onResponse.bind(this), claimName, claimDescription);
  }
  

  onResponse(_res: string){
    this._response = _res;
    
    if(this._response == "Claim created!"){
        alert("Your claim has been submitted");
    }
    }

}
