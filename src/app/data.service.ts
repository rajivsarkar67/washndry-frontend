import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  authToken = signal('');
  userType = signal('');
  loaderState = signal(false);

  itemsList = signal([
    {name: 'T-shirt', cost: 8, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Half Pant', cost: 12, snapshot: 'half_pant.png', quantity: 0},
    {name: 'Shirt', cost: 15, snapshot: 'shirt.png', quantity: 0},
    {name: 'Full Pant', cost: 20, snapshot: 'full_pant.png', quantity: 0},
    {name: 'Jeans', cost: 25, snapshot: 'jeans.png', quantity: 0}
  ]);
  
  ordersList = signal<any[]>([]);

  totalItems = signal(0);
  totalPrice = signal(0);

  selectedDate = signal<Date | undefined>(undefined);
  selectedTimeSlot = signal('');

  calculateTotalItemsAndPrice(){
    const items = this.itemsList();
    this.totalItems.set(items.reduce((total, item) => total + item.quantity, 0));
    this.totalPrice.set(items.reduce((total, item) => total + item.quantity * item.cost, 0));
  }

  emptyItemsList(){
    this.itemsList.update(items => items.map(item => ({...item, quantity: 0})));
    this.totalItems.set(0);
    this.totalPrice.set(0);
    this.selectedDate.set(new Date());
    this.selectedTimeSlot.set('');
  }

}
