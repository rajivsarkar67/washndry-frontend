import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TotalAmountSectionComponent } from '../total-amount-section/total-amount-section.component';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
    selector: 'app-selection',
    imports: [TotalAmountSectionComponent, HeaderComponent, RouterLink],
    templateUrl: './selection.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './selection.component.css'
})
export class SelectionComponent {

  constructor(private router: Router, public dataService: DataService){}

  navigateToNextPage(){
    if(this.dataService.totalPrice < 250){
      alert('The minimum order value is 250 rupees');
      return;
    }
    localStorage.setItem('washdrySelection', JSON.stringify(this.dataService.itemsList));
    this.router.navigate(['schedule']);
  }

  changeQuantity(action: string, index: number){
    if(action === 'decrease'){
      this.dataService.itemsList[index].quantity -= 1;
    }
    if(action === 'increase'){
      this.dataService.itemsList[index].quantity += 1;
    }
    this.dataService.calculateTotalItemsAndPrice();
  }

}
