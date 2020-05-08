import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router'; 
import { CookieService } from 'ngx-cookie-service';
import { concat } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttpService {
  user;
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private route: Router,
  ) { }
  getUser(){
    this.user = this.cookieService.get('email');
    // console.log('this.cookieService.get(user)',this.cookieService.getAll())
    return this.user;
  }
  logout(){
    this.user = {email:''};
    this.route.navigate(['/login'])
    this.cookieService.deleteAll();
  }
  login(email, password) {
    this.http.post('/api/v1/user/getUser', {email, password}).subscribe((data: any) =>{
      // this.user.email = data.user.email;
      console.log('data.user',data.user)
      this.cookieService.set('email', data.user.email);
      console.log('this.user',data)
      this.route.navigate(['/'])
    }, err => {
      console.log(err)
      if( err.status != 404 ){
        alert(err.error.msg)
      }
    })
  }

  getCustomers(){
    return this.http.get('/api/v1/customer/getAllCustomer');
  }

  getCustomerBills(customer_id){
    
    return this.http.post('/api/v1/bill/getNotPayedBill',{customer_id});
  }

  getCustomerPayedBills(customer_id){
    return this.http.post('/api/v1/bill/getPayedBill',{customer_id});
  }

  updateBills(bills){
    return this.http.put('/api/v1/bill/update',{bills});
  }

  addBills(bills){
    return this.http.post('/api/v1/bill/saveBill',{bills});
  }

}
