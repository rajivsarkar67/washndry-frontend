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
    const token = this.dataService.authToken || localStorage.getItem('washdryAuthToken') || '';
    this.dataService.authToken = token;
    return { 'Authorization': 'Bearer ' + token };
  }

  private buildOrderPayload(formValues: any[]) {
    const selectedItems = JSON.parse(localStorage.getItem('washdrySelection') as string);
    const selectedDate = localStorage.getItem('washdrySelectedDate');
    const selectedTimeSlot = localStorage.getItem('washdrySelectedTimeSlot');
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
      const token = this.dataService.authToken || localStorage.getItem('washdryAuthToken');
      if (!token) {
        const pendingOrder = this.buildOrderPayload(formValues);
        localStorage.setItem('washdryPendingOrder', JSON.stringify(pendingOrder));
        this.router.navigate(['login'], { queryParams: { returnUrl: '/address' } });
        return;
      }

      alert("You will be sent confirmation on whatsapp if your order is accepted.");
      const payload = this.buildOrderPayload(formValues);
      const headers = this.getAuthHeaders();
      this.http.post('https://washndry-backend.onrender.com/api/orders', payload, {headers}).subscribe(res => {
        localStorage.removeItem('washdrySelection');
        localStorage.removeItem('washdrySelectedDate');
        localStorage.removeItem('washdrySelectedTimeSlot');
        localStorage.removeItem('washdryPendingOrder');
        this.dataService.emptyItemsList();
        this.router.navigate(['orders-list']);
      }, (error)=>{
        alert(error.error.message);
      });
    }
  }
}
