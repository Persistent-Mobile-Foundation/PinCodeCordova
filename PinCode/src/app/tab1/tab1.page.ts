import { Component,NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  private readonly URL = '../../assets/data/side_menu.json';
  items: any[]=[];
  constructor(public httpClient: HttpClient,private router:Router,private ngZone:NgZone) {
 
  }

  ngOnInit() {
    this.httpClient.get(this.URL)
    .subscribe((res: any) => {
      this.items = res;
      console.warn(this.items);
    });
  }

  open_feature(id:number){
    console.log(id);
    if(id===2){
      this.router.navigate(['/getbalance'])
    }else{
      console.log('dont navigate');
    }

  }
}
