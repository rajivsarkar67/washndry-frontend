import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private dataService: DataService, private http: HttpClient, private validationService: ValidationService){}

  isGetOtpClicked: boolean = false;
  hasReceivedOtp: boolean = false;
  resendOtpTimer: number = 60;

  goToSelection(phoneNumber: number, password: string){
    if(!phoneNumber || !password){
      alert('Phone Number or Password cannot be empty!');
      return;
    }
    if(!this.validationService.checkPhoneNumber(phoneNumber)){
      alert('Phone Number should be 10 digits starting with 6,7,8 or 9');
      return;
    }
    this.http.post('http://localhost:5000/api/login', {phoneNumber: phoneNumber, password: password}).subscribe((res:any) => {
      console.log(res);
      this.dataService.authToken = res.token;
      localStorage.setItem('washndryAuthToken', this.dataService.authToken);
      this.router.navigate(['selection']);
    }, (error)=> {
      alert(error.error.message);
    })
  }

}
