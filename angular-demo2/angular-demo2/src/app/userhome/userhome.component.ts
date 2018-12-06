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
   
   private _response;
   
   private _retrieveItems: Observable<any[]>;
   
   private reviewsRetrieved: Observable<any[]>;
   
   private commentResponse = '';
   
   private cartResponse: Item[] = [];
   
   private cartSize = 0;
   
   private totalNumber = 0;
   
   private acquired = false;
   
   private invoiceOfCart = Array();
   
   private invoiceTotal = 0;
   
  constructor(private _router: Router, private parkaserivce: ParkaItemsService) { }
  
  ngOnInit() {
    this.parkaserivce.getSortedParka(this.onItemResponse.bind(this));
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
  

 acquireItemsFromCart(){
   if (this.cartSize < 1){
     return alert("Empty cart error!");
   } 

   if (confirm("Are you sure you would like to buy these items?")){
        this.acquired = true;
        this.invoiceOfCart = this.cartResponse;
        this.invoiceTotal = this.totalNumber;
        this.parkaserivce.acquiredItems(this.cartResponse, this.cartSize, this.onResponseAcquire.bind(this));
        this.eCart();
        this.parkaserivce.getParkaData(this.onResponseAcquire.bind(this));
   }
 }

  eCart(){
    if (confirm('Clear the shopping chart')){
      this.cartSize = 0;
      this.cartResponse = [];
      this.totalNumber = 0;
    }
  }
  
   appendItemToCart(p_price: number, p_name: string, p_quantity: number, previousQuantity: number){

    if (p_quantity < 1 || p_quantity > previousQuantity){
      return alert("Enter a valid quantity that is greater than 0")
    }

    var updatedItem = {
        name: p_name,
        price: p_price,
        quantity: p_quantity,
        oldQuantity: previousQuantity
    };

    if (this.cartSize > 0){
      for (let k = 0; k < this.cartSize; k++){
        if (this.cartSize[k].name == p_name){
          break;
        } else if (k == this.cartSize - 1 && this.cartResponse[k].name != p_name){
            this.cartSize = this.cartResponse.push(updatedItem);
            this.totalNumber += updatedItem.quantity * updatedItem.price;
        }
      }
    }
    else {
      this.cartSize = this.cartResponse.push(updatedItem);
      this.totalNumber += updatedItem.quantity * updatedItem.price;
    }

  }


   eQuantityofItem(p_edited_quantity: number, p_edited_name: string){
    for (let k = 0; k < this.cartSize; k++){
      if (this.cartResponse[k].name == p_edited_name){
        if (p_edited_quantity > this.cartResponse[k].previousQuantity){
          return alert("You have selected an invalid amount.")
        }
        var thePreviousQuantity = this.cartResponse[k].quantity;
        this.totalNumber -= this.cartResponse[k].price * thePreviousQuantity 
        this.cartResponse[k].quantity = p_edited_quantity;
        this.totalNumber += p_edited_quantity* this.cartResponse[k].price;

      }
    }
  }
  
  
  removeItems(p_name: string){
    for (let k = 0; k < this.cartSize; k++){
        if(this.cartResponse[k].name == p_name){
          this.totalNumber -= this.cartResponse[k].quantity * this.cartResponse[k];
        }
    } 
    this.cartResponse = this.cartResponse.filter(
          item => item.name != p_name);
      this.cartSize -= 1;
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
  
  onResponseAcquire(res: any){
    this._response = res;
  }
  
}
