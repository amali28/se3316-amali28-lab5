import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ResendService } from '../resend.service';
import { ActivatedRoute } from "@angular/router";


@Component({
  selector: 'app-needtoverify',
  templateUrl: './needtoverify.component.html',
  styleUrls: ['./needtoverify.component.css']
})
export class NeedtoverifyComponent implements OnInit {

  private response = '';

  constructor(private route: ActivatedRoute, private _router: Router, private http: HttpClient, private resendservice: ResendService) { }
  ngOnInit() {
  }
  
  resendVerification(){
    
    var verificationCode;
    this.route.params.subscribe( params =>  verificationCode = params
    
    );
    console.log(verificationCode);
     this.resendservice.resendVerification(this.onResponse.bind(this), verificationCode);
  }
 
  onResponse(res: string){
    console.log(res);
  }
}
