import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

declare var WL: any;
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  private readonly URL = '../../assets/data/side_menu.json';
  items: any[] = [];
  constructor(private _router: Router,public httpClient: HttpClient) {

    setTimeout(() => {
      WL.Client.pinTrustedCertificatePublicKey('myCertificate.der').then(this.onSuccess, this.onFailure); 
    }, 1000);

    this.httpClient.get(this.URL)
    .subscribe((res: any) => {
      this.items = res;
      console.warn(this.items);
    });
    
  }

  onSuccess() {
    console.log("success certificate")
  }
  onFailure() {
    console.log("failure certificate")
  }


}
