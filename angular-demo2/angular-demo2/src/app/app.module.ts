import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkaItemsComponent } from './parka-items/parka-items.component';
import { ParkaItemsService } from './parka-items.service';
import { RetrieveParkasComponent } from './retrieve-parkas/retrieve-parkas.component';
import { LoginComponent } from './login/login.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { UserhomeComponent } from './userhome/userhome.component';
import { LoginService } from './login.service';
import { SignupService } from './signup.service';
import { NeedtoverifyComponent } from './needtoverify/needtoverify.component';
import { ResendService } from './resend.service';
import { AdminpageComponent } from './adminpage/adminpage.component';
import { RetrieveusersComponent } from './retrieveusers/retrieveusers.component';
import { RetrieveusersService } from './retrieveusers.service';
import { PolicyComponent } from './policy/policy.component';
import { PolicyService } from './policy.service';
import { ViewpolicyComponent } from './viewpolicy/viewpolicy.component';
import { ViewclaimsComponent } from './viewclaims/viewclaims.component';

@NgModule({
  declarations: [
    AppComponent,
    ParkaItemsComponent,
    RetrieveParkasComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    UserhomeComponent,
    NeedtoverifyComponent,
    AdminpageComponent,
    RetrieveusersComponent,
    PolicyComponent,
    ViewpolicyComponent,
    ViewclaimsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    FormsModule,
      RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'signup',
        component: SignupComponent
      },
      {
        path: 'userhome/:id',
        component: UserhomeComponent
      },
      {
        path: 'resend/:id',
        component: NeedtoverifyComponent
      },
      {
        path: 'admindash/:id',
        component: AdminpageComponent
      },
      {
        path: 'policy',
        component: ViewpolicyComponent
      },
      ])
  ],
  providers: [ParkaItemsService, LoginService, SignupService, ResendService, RetrieveusersService, PolicyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
