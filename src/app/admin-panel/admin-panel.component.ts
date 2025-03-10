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
    console.log('saveOrderDetails called');
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    let dataObj = {};
    if(this.ordersList[i].status === 'Picked Up'){
      dataObj = {orderId: this.ordersList[i]._id, status: 'Picked Up', pickupDate: new Date()};
    } 
    if(this.ordersList[i].status === 'Delivered'){
      dataObj = {orderId: this.ordersList[i]._id, status: 'Delivered', deliveryDate: new Date()};
    }
    this.http.patch('http://localhost:5000/api/update-order', dataObj, {headers}).subscribe((res: any) => {
      window.location.reload();
    })
  }

  cancelOrderDetails(){
    window.location.reload();
  }

}
