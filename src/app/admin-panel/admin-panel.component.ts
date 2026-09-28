import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service';
import { DatePipe } from '@angular/common';
import {FormsModule} from '@angular/forms';

@Component({
    selector: 'app-admin-panel',
    imports: [HeaderComponent, DatePipe, FormsModule],
    templateUrl: './admin-panel.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {

  constructor(private http: HttpClient, private dataService: DataService){}

  ordersList = signal<any[]>([]);
  statuses = ['Ordered', 'Order Confirmed', 'Picked Up', 'Delivered'];

  ngOnInit(){
    this.loadOrders();
  }

  private loadOrders(){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken() };
    this.http.get('https://washndry-backend.onrender.com/api/all-orders', {headers}).subscribe((res:any) => {
      this.ordersList.set(res.orders.map((order: any) => ({
        ...order,
        isAnythingChanged: false,
        originalStatus: order.status
      })));
    }, (error)=>{
      alert(error.error.message);
    });
  }

  saveOrderDetails(i: number){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken() };
    const order = this.ordersList()[i];
    const dataObj: { orderId: string; status: string; pickupDate?: Date; deliveryDate?: Date } = {
      orderId: order._id,
      status: order.status
    };
    if(order.status === 'Picked Up'){
      dataObj.pickupDate = new Date();
    }
    if(order.status === 'Delivered'){
      dataObj.deliveryDate = new Date();
    }
    this.http.patch('https://washndry-backend.onrender.com/api/update-order', dataObj, {headers}).subscribe({
      next: () => this.loadOrders(),
      error: (error) => alert(error.error?.message || 'Unable to update order. Please try again.')
    });
  }

  cancelOrderDetails(i: number){
    this.ordersList.update(orders => orders.map((order, index) => index === i
      ? {...order, status: order.originalStatus, isAnythingChanged: false}
      : order));
  }

  markOrderChanged(index: number){
    this.ordersList.update(orders => orders.map((order, orderIndex) => orderIndex === index
      ? {...order, isAnythingChanged: true}
      : order));
  }

}
