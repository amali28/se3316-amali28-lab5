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
     
  constructor(private _router: Router, private parkaserivce: ParkaItemsService) { }
  
  ngOnInit() {
    this.parkaserivce.getParkaData(this.onItemResponse.bind(this));
  }
  
  onItemResponse(itemResponse: Observable<Any[]>){
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
  
  
  itemSelect: Item
  
  onSelect(item: Item): void{
   this.showSelected = !this.showSelected;
   this.itemSelect= item; 
   this._parkas.retrieveReviews(this.onResponseRatings.bind(this), this.itemSelect.name);
  }

}
