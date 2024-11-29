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

  totalItems: number = 0;
  totalPrice: number = 0;

  calculateTotalItemsAndPrice(){
    this.totalItems = 0;
    this.totalPrice = 0;
    this.itemsList.forEach(el => {
      this.totalItems = this.totalItems + el.quantity;
      this.totalPrice = this.totalPrice + (el.quantity * el.cost);
    })
  }

}
