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
    {name: 'T-shirt', cost: 25, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Half Pant', cost: 25, snapshot: 'half_pant.png', quantity: 0},
    {name: 'Shirt', cost: 40, snapshot: 'shirt.png', quantity: 0},
    {name: 'Full Pant', cost: 40, snapshot: 'full_pant.png', quantity: 0},
    {name: 'Jeans', cost: 60, snapshot: 'jeans.png', quantity: 0}
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
