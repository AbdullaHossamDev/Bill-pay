import { Component, OnInit } from '@angular/core';
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email = '';
  password;
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit(): void {
  }

  login(){
    this.http.login(this.email, this.password);
  }

}
