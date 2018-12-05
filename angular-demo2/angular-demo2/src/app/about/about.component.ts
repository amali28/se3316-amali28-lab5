import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ParkaItemsService } from '../parka-items.service';
import { Observable } from 'rxjs';
import { Item } from '../../../../../app/models/item';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private _response: Observable<any[]>;
  
  private sortedItems: Observable<any[]>;
  
  private reviewsRetrieved: Observable<any[]>;
  
  private showSelected;
  
  constructor(private _router: Router, private _parkas: ParkaItemsService) { }
  
  loginClick() {
    this._router.navigateByUrl('login');
  }

  ngOnInit() {
    this._parkas.getParkaByPop(this.onResponse.bind(this))
  }
  retrievePolicies(){
    this._router.navigateByUrl('policy');
  }
  
  onResponse(_res: Observable<any[]>){
    this._response = _res;
  }
  
  onResponseSorted(sortedItems: Observable<any[]>){
    this.sortedItems = sortedItems;
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
