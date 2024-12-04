import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [HeaderComponent],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  constructor(private router: Router, public dataService: DataService){}

  goToSelection(){
    this.router.navigate(['selection']);
  }
}
