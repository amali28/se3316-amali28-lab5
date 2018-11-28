import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ParkaItemsComponent } from './parka-items/parka-items.component';
import { ParkaItemsService } from './parka-items.service';
import { RetrieveParkasComponent } from './retrieve-parkas/retrieve-parkas.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    ParkaItemsComponent,
    RetrieveParkasComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [ParkaItemsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
