import { ChangeDetectorRef, Component, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'app-orders-list',
    imports: [HeaderComponent, DatePipe],
    templateUrl: './orders-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  constructor(private router: Router, public dataService: DataService, private http: HttpClient, private changeDetectorRef: ChangeDetectorRef){}

  ordersList: any = [];

  ngOnInit(){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    this.http.get('https://washndry-backend.onrender.com/api/orders', {headers}).subscribe((res:any) => {
      this.ordersList = res.orders;
      this.changeDetectorRef.markForCheck();
    }, (error)=>{
      alert(error.error.message);
    });
  }

  cancelOrder(id: string){
    let status = confirm('Are you sure you want to cancel this order?');
    if(status){
      const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
      this.http.delete(`https://washndry-backend.onrender.com/api/orders/delete/${id}`, {headers}).subscribe((res:any) => {
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
