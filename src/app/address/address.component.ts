import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TotalAmountSectionComponent, HeaderComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {
  constructor(private router: Router, public dataService: DataService, private http: HttpClient, private validationService: ValidationService){}
  
  navigateToNextPage(...formValues: any[]){
    let isFormInvalid = formValues.some(value => {
      return value==='';
    })
    if(isFormInvalid){
      alert('All values must be filled');
      return;
    }
    else if(!this.validationService.checkPincode(formValues[2])){   //taking out the pincode
      alert('Pincode must be 6 digits');
      return;
    }
    else{
      // constructing data to be sent
      let selectedItems = JSON.parse(localStorage.getItem('washndrySelection') as string);
      let selectedDate = localStorage.getItem('washndrySelectedDate');
      let selectedTimeSlot = localStorage.getItem('washndrySelectedTimeSlot');
      let [name, fullAddress, pincode, city, state] = formValues;
      let address = {name, fullAddress, pincode, city, state};
      const headers = { 'Authorization': 'Bearer '+ this.dataService.authToken };
      this.http.post('http://localhost:5000/api/orders',{selectedItems, selectedDate, selectedTimeSlot, address}, {headers}).subscribe(res => {
        this.router.navigate(['orders-list']);
      }, (error)=>{
        alert(error.error.message);
      });
    }
  }
}
