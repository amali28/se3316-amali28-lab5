import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; 


@Injectable({
  providedIn: 'root'
})
export class ResendService {

  constructor(private http: HttpClient) {
  }
  
  resendVerification(call, verify){
    this.http.post('/api/resend/:id', {'verificationCode': verify}).subscribe(data => {
      console.log(data);
      
       call(data['message']);
    })
  
  }
}
