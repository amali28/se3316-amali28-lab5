import { Component, OnInit } from '@angular/core';
import { ParkaItemsService } from '../parka-items.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-parka-items',
  templateUrl: './parka-items.component.html',
  styleUrls: ['./parka-items.component.css']
})
export class ParkaItemsComponent implements OnInit {

  private _response: Observable<any[]>;
  private dataCollected: [string, number, number, number];
  
  
  constructor(private _getParkas: ParkaItemsService) { }

  ngOnInit() {
  }
  
  onClick(){
    this._getParkas.getParkaData(this.onResponse.bind(this));
  }
  
  deleteParkaData(id: string){
    this._getParkas.deleteParkaData(id, this.onResponse.bind(this));
  }
  
  editParkaData(id: string, p_name: string, p_price: number, p_quantity: number, p_description:string){
    console.log(p_name);
    this._getParkas.updateParkaData(id, p_name, p_price, p_quantity, p_description, this.onResponse.bind(this));
  }
  
  addParka(p_name: string, p_price: number, p_quantity: number,p_description: string,  p_tax: number){
     this._getParkas.postParkaData(p_name, p_price, p_quantity, p_description, p_tax, this.onResponse.bind(this));
  }
  
   onResponse(_res: Observable<any[]>){
    this._response = _res;
  }
}
