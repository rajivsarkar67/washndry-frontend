import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from '../total-amount-section/total-amount-section.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [TotalAmountSectionComponent, HeaderComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {

  constructor(private router: Router){}
  
  itemsList = [
    {name: 'T-shirt', cost: 10, snapshot: 'tshirt.png', quantity: 0},
    {name: 'Shirt', cost: 10, snapshot: 'shirt.png', quantity: 0},
    {name: 'Jeans/Pant', cost: 10, snapshot: 'pant.png', quantity: 0},
    {name: 'Saree', cost: 10, snapshot: 'saree.png', quantity: 0},
    {name: 'Sweater', cost: 10, snapshot: 'sweater.png', quantity: 0},
    {name: 'Undergarment', cost: 10, snapshot: 'undergarment.png', quantity: 0},
  ];

  navigateToNextPage(){
    this.router.navigate(['schedule']);
  }

  changeQuantity(action: string, index: number){
    if(action === 'decrease' && this.itemsList[index].quantity > 0){
      this.itemsList[index].quantity -= 1;
    }
    if(action === 'increase'){
      this.itemsList[index].quantity += 1;
    }
  }
}
