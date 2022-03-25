import { HttpClient } from '@angular/common/http';
import { AuthenticationResult } from '@azure/msal-browser';
import { MsalService } from '@azure/msal-angular';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'My Microsoft Login- Example';

  apiResponse:any
//private authService: MsalService, 
  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {}


  sayHello () {
    this.http.get(`${environment.baseUrl}/home`).subscribe( resp  => {
      this.apiResponse = JSON.stringify(resp)
      console.log(this.apiResponse)
    })
  }
}