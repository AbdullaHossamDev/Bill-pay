import { Component, OnInit , Input} from '@angular/core';
import { MatToolbar,MatToolbarRow } from '@angular/material/toolbar'
import { HttpService } from '../service/http.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {

  @Input() auth;
  constructor(
    private http: HttpService,
  ) { }

  ngOnInit(): void {
  }

  logout(){
    this.http.logout();
  }

}
