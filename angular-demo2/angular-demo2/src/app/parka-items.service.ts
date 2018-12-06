import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ParkaItemsService {

  constructor(private _http: HttpClient) { }
  
  getSortedParka(call_back){
     this._http.get('/api/products').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  getParkaData(call_back){
    this._http.get('/api/items').subscribe(data => {
      console.log(data);
      call_back(data);
    })
  }
  
  getParkaByPop(call_back){
    this._http.get('/api/itemspop').subscribe(data => {
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
  
  postComment(itemName: string, userField: string, commentField: string, ratingSelected:string, call_back){
     this._http.post('/api/reviews/'+itemName, {email: userField, comment: commentField, rating: ratingSelected}).subscribe(data => {
          console.log("Posted your review!");
          call_back(data);
      });
  }
  retrieveReviews(call_back, itemName: string){
    this._http.get('/api/reviews/' + itemName).subscribe(data => {
        var review = JSON.stringify(data);
        console.log(review);
         call_back(data);
      });
  }
  
  acquiredItems(listOfItemsAcquire, numberOfItems, call_back){
     this._http.put('/api/buyitem', {cartOfList: listOfItemsAcquire, cartOfSize: numberOfItems}).subscribe(data => {
          console.log(data);
          call_back(data);
      });
  }
}
