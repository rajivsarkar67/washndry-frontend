import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TotalAmountSectionComponent, HeaderComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  constructor(private router: Router, public dataService: DataService){}
  
  navigateToNextPage(...formValues: any[]){
    let isFormInvalid = formValues.some(value => {
      return value==='';
    })
    if(isFormInvalid){
      alert('All values must be filled');
      return;
    }
    this.router.navigate(['orders-list']);
  }
}
