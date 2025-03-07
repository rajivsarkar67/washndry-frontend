import { Component } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-admin-panel',
  standalone: true,
  imports: [HeaderComponent, DatePipe, FormsModule],
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  constructor(private http: HttpClient, private dataService: DataService){}

  ordersList: any = [];
  statuses = ['Ordered', 'Picked Up', 'Delivered'];

  ngOnInit(){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    this.http.get('http://localhost:5000/api/all-orders', {headers}).subscribe((res:any) => {
      this.ordersList = res.orders;
      console.log(res);
      this.ordersList.forEach((el: any) => {
        el.isAnythingChanged = false;
      })
    }, (error)=>{
      alert(error.error.message);
    });
  }

  saveOrderDetails(i: number){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    let pickupDate : Date;
    let deliveryDate : Date;
    let dataObj = {};
    if(this.ordersList[i].status === 'Picked Up'){
      dataObj = {_id: this.ordersList[i]._id, selectedDate: new Date()};
    } 
    if(this.ordersList[i].status === 'Delivered'){
      dataObj = {_id: this.ordersList[i]._id, deliveryDate: new Date()};
    }
    // this.http.post('http://localhost:5000/api/edit-order', dataObj, {headers}).subscribe((res: any) => {

    // })
  }

  cancelOrderDetails(){
    window.location.reload();
  }

}
