import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }
  displayData : any
  ngOnInit(): void {
  }
  shareData(data:any){
    console.log(data)
    this.displayData = data
  }

}
