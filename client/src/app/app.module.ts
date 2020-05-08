import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';


import { MaterialModule } from './material/material.module';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { CookieService } from 'ngx-cookie-service';
import { EditBillsComponent } from './edit-bills/edit-bills.component';
import { AddBillComponent } from './add-bill/add-bill.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    EditBillsComponent,
    AddBillComponent,
  ],
  imports: [
    MaterialModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent],
  entryComponents: [EditBillsComponent, AddBillComponent]
})
export class AppModule { }
