import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [HeaderComponent, DatePipe],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  constructor(private router: Router, public dataService: DataService, private http: HttpClient){}

  ordersList: any = [];

  ngOnInit(){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    this.http.get('http://localhost:5000/api/orders', {headers}).subscribe((res:any) => {
      this.ordersList = res.orders;
    }, (error)=>{
      alert(error.error.message);
    });
  }
  
  getTotalItems(order: any){
    let totalItems = 0;
    order.selectedItems.forEach((orderItem:any) => {
      totalItems = totalItems + orderItem.quantity;
    })
    return totalItems;
  }

  cancelOrder(id: string){
    let status = confirm('Are you sure you want to cancel this order?');
    if(status){
      const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
      this.http.delete(`http://localhost:5000/api/orders/delete/${id}`, {headers}).subscribe((res:any) => {
        console.log(res);
        this.ngOnInit();
      }, (error)=>{
        alert(error.error.message);
      });
    }
  }

  goToSelection(){
    this.router.navigate(['selection']);
  }
}
