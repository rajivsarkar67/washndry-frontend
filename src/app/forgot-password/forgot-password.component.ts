import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private http: HttpClient){}

  isPhoneNumberChecked: boolean = false;

  verifyPhoneNumber(phoneNumber: number){
    console.log(phoneNumber);
    console.log(typeof(phoneNumber));
    this.isPhoneNumberChecked = true;
  }

}
