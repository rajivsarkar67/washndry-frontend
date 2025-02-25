import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  checkPincode(pincode: number){
    return (pincode>=100000 && pincode <=999999);
  }

  checkPhoneNumber(phoneNumber: number){
    return (phoneNumber>=6000000000 && phoneNumber<=9999999999);
  }
}
