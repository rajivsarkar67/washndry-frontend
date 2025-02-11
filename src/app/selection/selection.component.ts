import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from '../total-amount-section/total-amount-section.component';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
  selector: 'app-selection',
  standalone: true,
  imports: [TotalAmountSectionComponent, HeaderComponent],
  templateUrl: './selection.component.html',
  styleUrl: './selection.component.css'
})
export class SelectionComponent {

  constructor(private router: Router, public dataService: DataService){}

  ngOnInit(){
    console.log('ngOninit called');
    if(localStorage.getItem('washndrySelection')){
      console.log('on refresh of page');
      console.log(localStorage.getItem('washndrySelection'));
      this.dataService.itemsList = JSON.parse(localStorage.getItem('washndrySelection') as string);
      console.log(this.dataService.itemsList);
      this.dataService.calculateTotalItemsAndPrice();
    }
  }

  navigateToNextPage(){
    localStorage.setItem('washndrySelection', JSON.stringify(this.dataService.itemsList));
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
