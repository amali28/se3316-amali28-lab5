import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParkaItemsService {

  constructor(private _http: HttpClient) { }
  
  getParkaData(call_back){
    this._http.get('/api/items').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
  getUserData(call_back){
    this._http.get('/api/users').subscribe(data => {
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
  
  deleteParkaData(id: string, call_back){
    this._http.delete('/api/modify/'+id).subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  postParkaData(p_name: string, p_price: number, p_quantity: number, p_description: string, p_tax: number, call_back){
    this._http.post('/api/items', {name: p_name, price: p_price, quantity: p_quantity, descript: p_description, tax: p_tax}).subscribe(data => {
          console.log("POST success!");
          call_back(data);
      });
  }
}
