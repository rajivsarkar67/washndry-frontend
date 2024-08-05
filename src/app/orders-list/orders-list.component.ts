import { Component } from '@angular/core';

@Component({
  selector: 'app-orders-list',
  standalone: true,
  imports: [],
  templateUrl: './orders-list.component.html',
  styleUrl: './orders-list.component.css'
})
export class OrdersListComponent {

  ongoingOrdersList = [
    {id: 7, orderDate: '5 Aug 2024', deliveryDate: '10 Aug 2024', totalItem: 10, totalAmount: 100},
    {id: 4, orderDate: '3 Aug 2024', deliveryDate: '11 Aug 2024', totalItem: 20, totalAmount: 230},
  ];

  pastOrdersList = [
    {id: 1, orderDate: '1 Jul 2024', deliveryDate: '3 Jul 2024', totalItem: 8, totalAmount: 70},
    {id: 2, orderDate: '10 Jul 2024', deliveryDate: '15 Jul 2024', totalItem: 6, totalAmount: 50},
    {id: 3, orderDate: '19 Jul 2024', deliveryDate: '23 Jul 2024', totalItem: 12, totalAmount: 100},
  ];
}
