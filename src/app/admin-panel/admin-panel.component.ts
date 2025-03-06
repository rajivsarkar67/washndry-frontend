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
    this.ordersList = [
      {orderId: '32939ddiidsa1', customerName: 'Rajiv Sarkar', createdAt: Date.now(), status: 'Ordered', selectedDate: '30 Jun 2025', deliveryDate: '5 June 2026', totalItems: 6, totalAmount: 100},
      {orderId: '32939ddiisa1', customerName: 'Rajiv Sarkar', createdAt: Date.now(), status: 'Picked Up', selectedDate: '30 Jun 2025', deliveryDate: '5 June 2026', totalItems: 6, totalAmount: 100},
      {orderId: '3293ddiidsa1', customerName: 'Rajiv Sarkar', createdAt: Date.now(), status: 'Delivered', selectedDate: '30 Jun 2025', deliveryDate: '5 June 2026', totalItems: 6, totalAmount: 100},
    ];
    this.ordersList.forEach((el: any) => {
      el.isAnythingChanged = false;
    })
    return;
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    this.http.get('http://localhost:5000/api/orders', {headers}).subscribe((res:any) => {
      this.ordersList = res.orders;
    }, (error)=>{
      alert(error.error.message);
    });
  }

  statusChanged(index: number){
    console.log('statusChanged called');
  }

}
