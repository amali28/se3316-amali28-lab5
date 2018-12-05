import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PolicyService {

  constructor(private _http: HttpClient) {
  
  }
  
 getPolicies(call_back){
    this._http.get('/api/policy').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  updatePolicies(id: string, p_one: string, p_two: string, p_three: string, call_back){
     this._http.put('/api/policy/'+id, {policy1: p_one, policy2: p_two, policy3: p_three}).subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
  createClaim(call, claimName, claimDescription){
    this._http.post('/api/policy', {'claimName': claimName, 'claimDescription': claimDescription}).subscribe(data => {
      console.log(data);
      call(data['message']);
    })
  }
  
  getClaims(call_back){
    this._http.get('/api/claims').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
}
