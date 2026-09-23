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
    {name: 'T-shirt', cost: 8, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Half Pant', cost: 12, snapshot: 'half_pant.png', quantity: 0},
    {name: 'Shirt', cost: 15, snapshot: 'shirt.png', quantity: 0},
    {name: 'Full Pant', cost: 20, snapshot: 'full_pant.png', quantity: 0},
    {name: 'Jeans', cost: 25, snapshot: 'jeans.png', quantity: 0}
  ];
  
  ordersList = [];

  totalItems: number = 0;
  totalPrice: number = 0;

  selectedDate: Date | undefined;
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
