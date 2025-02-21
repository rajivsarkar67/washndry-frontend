import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  constructor(private router: Router, public dataService: DataService, private http: HttpClient){}

  ngOnInit(){
    const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
    this.http.get('http://localhost:5000/api/orders', {headers}).subscribe(res => {
      console.log(res);
    }, (error)=>{
      alert(error.error.message);
    });
  }

  goToSelection(){
    this.router.navigate(['selection']);
  }
}
