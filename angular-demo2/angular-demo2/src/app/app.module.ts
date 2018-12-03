import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

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

@NgModule({
  declarations: [
    AppComponent,
    ParkaItemsComponent,
    RetrieveParkasComponent,
    LoginComponent,
    AboutComponent,
    HomeComponent,
    SignupComponent,
    UserhomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
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
        path: 'userhome',
        component: UserhomeComponent
      }
      ])
  ],
  ],
  providers: [ParkaItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
