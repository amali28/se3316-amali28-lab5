import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RetrieveusersService {

  constructor(private _http: HttpClient) { }

  getUserData(call_back){
    this._http.get('/api/users').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
  deleteUser(id: string, call_back){
    this._http.delete('/api/deleteusers/'+id).subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
  updateParkaData(id: string, p_name: string, p_price: number, p_quantity: number, p_description: string, call_back){
    this._http.put('/api/modify/'+id ,{name: p_name, price: p_price, quantity: p_quantity, descript:p_description}).subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  updateUser(id: string, isAdmin: boolean, isDisabled: boolean, call_back){
    this._http.put('/api/deleteusers/'+id, {isAdmin: isAdmin, isDisabled: isDisabled}).subscribe(data =>{
        console.log(data);
        call_back(data);
    })
  }
}
