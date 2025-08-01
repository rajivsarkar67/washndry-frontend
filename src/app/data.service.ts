import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  authToken = '';
  userType = '';
  loaderState = signal(false);

  itemsList = [
    {name: 'T-shirt', cost: 20, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Half Pant', cost: 20, snapshot: 'half_pant.png', quantity: 0},
    {name: 'Shirt', cost: 35, snapshot: 'shirt.png', quantity: 0},
    {name: 'Full Pant', cost: 40, snapshot: 'full_pant.png', quantity: 0},
    {name: 'Jeans', cost: 50, snapshot: 'jeans.png', quantity: 0}
  ];
  
  ordersList = [
    {id: 4, orderDate: '5 Aug 2024', status: 'Picked Up', pickupDate: '10 Aug 2024', deliveryDate: '20 Aug 2024', totalItem: 10, totalAmount: 100},
    {id: 7, orderDate: '3 Aug 2024', status: 'Ordered', pickupDate: '11 Aug 2024', deliveryDate: '22 Aug 2024', totalItem: 20, totalAmount: 230},
    {id: 9, orderDate: '10 Jan 2025', status: 'Delivered', pickupDate: '11 Jan 2025', deliveryDate: '18 Jan 2025', totalItem: 5, totalAmount: 95},
  ];

  totalItems: number = 0;
  totalPrice: number = 0;

  selectedDate: Date = new Date();
  selectedTimeSlot: string = '';

  calculateTotalItemsAndPrice(){
    this.totalItems = 0;
    this.totalPrice = 0;
    this.itemsList.forEach(el => {
      this.totalItems = this.totalItems + el.quantity;
      this.totalPrice = this.totalPrice + (el.quantity * el.cost);
    })
  }

  emptyItemsList(){
    this.itemsList.map(el => {
      el.quantity = 0;
    });
    this.totalItems = 0;
    this.totalPrice = 0;
    this.selectedDate = new Date();
    this.selectedTimeSlot = '';
  }

}
