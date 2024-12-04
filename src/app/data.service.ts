import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  itemsList = [
    {name: 'T-shirt', cost: 15, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Shirt', cost: 20, snapshot: 'shirt.png', quantity: 0},
    {name: 'Jeans/Pant', cost: 30, snapshot: 'pant.png', quantity: 0},
    {name: 'Saree', cost: 50, snapshot: 'saree.png', quantity: 0},
    {name: 'Sweater', cost: 30, snapshot: 'sweater.png', quantity: 0},
    {name: 'Undergarment', cost: 10, snapshot: 'undergarment.png', quantity: 0},
  ];
  
  ongoingOrdersList = [
    {id: 4, orderDate: '5 Aug 2024', pickupDate: '10 Aug 2024', totalItem: 10, totalAmount: 100},
    {id: 7, orderDate: '3 Aug 2024', pickupDate: '11 Aug 2024', totalItem: 20, totalAmount: 230},
  ];

  pastOrdersList = [
    {id: 1, orderDate: '1 Jul 2024', deliveryDate: '3 Jul 2024', totalItem: 8, totalAmount: 70},
    {id: 2, orderDate: '10 Jul 2024', deliveryDate: '15 Jul 2024', totalItem: 6, totalAmount: 50},
    {id: 3, orderDate: '19 Jul 2024', deliveryDate: '23 Jul 2024', totalItem: 12, totalAmount: 100},
  ];

  totalItems: number = 0;
  totalPrice: number = 0;
  isLoggedIn: boolean = false;

  calculateTotalItemsAndPrice(){
    this.totalItems = 0;
    this.totalPrice = 0;
    this.itemsList.forEach(el => {
      this.totalItems = this.totalItems + el.quantity;
      this.totalPrice = this.totalPrice + (el.quantity * el.cost);
    })
  }

}
