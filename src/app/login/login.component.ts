import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router){}

  isGetOtpClicked: boolean = false;
  hasReceivedOtp: boolean = false;
  resendOtpTimer: number = 60;

  sendOtp(){
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

  goToSelection(){
    this.router.navigate(['selection']);
  }

}
