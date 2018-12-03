import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) {
  }
  
  validateAccountLogin(call, email, password){
    this.http.post('/api/login', {'email': email, 'password': password}).subscribe(data => {
      console.log(data);
      
      if (data['email'] != null){
          call(data['message']);
          localStorage.setItem('user', JSON.stringify(data['email']));
          console.log(localStorage.getItem('user'));
      }
      
      call(data['message']);
    })
  }
}
