import { Component, OnInit } from '@angular/core';
import { RetrieveusersService } from '../retrieveusers.service'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-retrieveusers',
  templateUrl: './retrieveusers.component.html',
  styleUrls: ['./retrieveusers.component.css']
})
export class RetrieveusersComponent implements OnInit {

  private _response: Observable<any[]>;
  
  constructor(private _getParkas: RetrieveusersService) { }

  ngOnInit() {
  }
  
  retrieveUsers(){
    this._getParkas.getUserData(this.onResponse.bind(this));
  }
  
  deleteUser(id: string){
  this._getParkas.deleteUser(id, this.onResponse.bind(this));
  }
  updateUser(id: string, isAdmin: boolean, isDisabled: boolean){
    this._getParkas.updateUser(id, isAdmin, isDisabled, this.onResponse.bind(this));
  }
  
  onResponse(_res: Observable<any[]>){
    this._response = _res;
  }

}
