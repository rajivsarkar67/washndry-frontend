import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private dataService: DataService){}

  isGetOtpClicked: boolean = false;
  hasReceivedOtp: boolean = false;
  resendOtpTimer: number = 60;

  sendOtp(phoneNumber: number){
    if(!phoneNumber){
      alert('Phone Number cannot be empty!');
      return;
    }
    this.isGetOtpClicked = true;
    this.hasReceivedOtp = true;

    const otpTimeout = setTimeout(()=>{
      this.hasReceivedOtp = false;
      clearInterval(otpTimer);
      this.resendOtpTimer = 60;
    }, 60000)

    const otpTimer = setInterval(()=>{
      this.resendOtpTimer = this.resendOtpTimer - 1;
    }, 1000)
  }

  goToSelection(otp: number){
    if(!otp){
      alert('OTP cannot be empty!');
      return;
    }
    this.dataService.isLoggedIn = true;
    this.router.navigate(['selection']);
  }

}
