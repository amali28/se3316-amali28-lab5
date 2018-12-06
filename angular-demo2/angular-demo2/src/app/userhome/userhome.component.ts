import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkaItemsService } from '../parka-items.service'
import { Item } from '../../../../../app/models/item';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-userhome',
  templateUrl: './userhome.component.html',
  styleUrls: ['./userhome.component.css']
})
export class UserhomeComponent implements OnInit {

   private showSelected;
   
   private _retrieveItems: Observable<any[]>;
   
   private reviewsRetrieved: Observable<any[]>;
   
   private commentResponse = '';
     
  constructor(private _router: Router, private parkaserivce: ParkaItemsService) { }
  
  ngOnInit() {
    this.parkaserivce.getParkaData(this.onItemResponse.bind(this));
  }
  
  onItemResponse(itemResponse: Observable<any[]>){
      this._retrieveItems = itemResponse;
  }
  
  retrievePolicies(){
    this._router.navigateByUrl('policy');
  }
  
  logOut(){
    this._router.navigateByUrl('login');
  }
  onResponseRatings(retrieveRetrieved: Observable<any[]>){
    this.reviewsRetrieved = retrieveRetrieved;
  }
  
  submitComment(itemName: string, userField: string, commentField: string, ratingSelected:string){
  
    this.parkaserivce.postComment(itemName, userField, commentField, ratingSelected, this.onResponseComments.bind(this));
  }
  
  
  onResponseComments(res: string){
    this.commentResponse = res;
    console.log(res);
  }
  
  itemSelect: Item
  
  onSelect(item: Item): void{
   this.showSelected = !this.showSelected;
   this.itemSelect= item; 
   this.parkaserivce.retrieveReviews(this.onResponseRatings.bind(this), this.itemSelect.name);
  }
  
}
