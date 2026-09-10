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

  private getAuthHeaders() {
    const token = this.dataService.authToken || localStorage.getItem('washndryAuthToken') || '';
    this.dataService.authToken = token;
    return { 'Authorization': 'Bearer ' + token };
  }

  private buildOrderPayload(formValues: any[]) {
    const selectedItems = JSON.parse(localStorage.getItem('washndrySelection') as string);
    const selectedDate = localStorage.getItem('washndrySelectedDate');
    const selectedTimeSlot = localStorage.getItem('washndrySelectedTimeSlot');
    const [name, fullAddress, pincode, city, state] = formValues;
    const address = {name, fullAddress, pincode, city, state};

    return {
      selectedItems,
      selectedDate,
      selectedTimeSlot,
      totalItems: this.dataService.totalItems,
      totalAmount: this.dataService.totalPrice,
      address,
    };
  }
  
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
      const token = this.dataService.authToken || localStorage.getItem('washndryAuthToken');
      if (!token) {
        const pendingOrder = this.buildOrderPayload(formValues);
        localStorage.setItem('washndryPendingOrder', JSON.stringify(pendingOrder));
        this.router.navigate(['login'], { queryParams: { returnUrl: '/address' } });
        return;
      }

      alert("You will be sent confirmation on whatsapp if your order is accepted.");
      const payload = this.buildOrderPayload(formValues);
      const headers = this.getAuthHeaders();
      this.http.post('http://localhost:5001/api/orders', payload, {headers}).subscribe(res => {
        localStorage.removeItem('washndrySelection');
        localStorage.removeItem('washndrySelectedDate');
        localStorage.removeItem('washndrySelectedTimeSlot');
        localStorage.removeItem('washndryPendingOrder');
        this.dataService.emptyItemsList();
        this.router.navigate(['orders-list']);
      }, (error)=>{
        alert(error.error.message);
      });
    }
  }
}
