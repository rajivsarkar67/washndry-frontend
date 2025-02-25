import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private http: HttpClient, private validationService: ValidationService){}

  isPhoneNumberChecked: boolean = false;

  verifyPhoneNumber(phoneNumber: number){
    if(!this.validationService.checkPhoneNumber(phoneNumber)){
      alert('Phone Number should be 10 digits starting with 6,7,8 or 9');
      return;
    }
    this.isPhoneNumberChecked = true;
  }

}
