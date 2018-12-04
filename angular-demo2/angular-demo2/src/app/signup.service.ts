import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 

@Injectable({
  providedIn: 'root'
})
export class SignupService {

  constructor(private http: HttpClient) {
  }
  
  createUserAccount(call, email, password){
    this.http.post('/api/createuser', {'email': email, 'password': password}).subscribe(data => {
      console.log(data);
      
      if (data['email'] != null){
          call(data['message']);
          localStorage.setItem('user', JSON.stringify(data['email']));
          console.log(localStorage.getItem('user'));
      }
      
      call(data['verificationCode']);
    })
  }
}
