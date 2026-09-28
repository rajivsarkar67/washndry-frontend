import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TotalAmountSectionComponent } from '../total-amount-section/total-amount-section.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
    selector: 'app-selection',
    imports: [TotalAmountSectionComponent, HeaderComponent, RouterLink],
    templateUrl: './selection.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './selection.component.css'
})
export class SelectionComponent {

  constructor(private router: Router, public dataService: DataService){}

  navigateToNextPage(){
    if(this.dataService.totalPrice() < 250){
      alert('The minimum order value is 250 rupees');
      return;
    }
    localStorage.setItem('washdrySelection', JSON.stringify(this.dataService.itemsList()));
    this.router.navigate(['schedule']);
  }

  changeQuantity(action: string, index: number){
    const change = action === 'decrease' ? -1 : action === 'increase' ? 1 : 0;
    this.dataService.itemsList.update(items => items.map((item, itemIndex) => itemIndex === index
      ? {...item, quantity: item.quantity + change}
      : item));
    this.dataService.calculateTotalItemsAndPrice();
  }

}
