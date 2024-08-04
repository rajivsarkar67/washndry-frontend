import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-amount-section',
  standalone: true,
  imports: [],
  templateUrl: './total-amount-section.component.html',
  styleUrl: './total-amount-section.component.css'
})
export class TotalAmountSectionComponent {
  @Input() btnLabel: string = '';

  constructor(private router: Router){}

  navigateToNextPage(){
    if(this.router.url === '/schedule'){
      this.router.navigate(['address']);
    }
    if(this.router.url === '/address'){
      this.router.navigate(['orders-list']);
    }
  }
}
