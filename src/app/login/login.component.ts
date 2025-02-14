import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router, private dataService: DataService, private http: HttpClient){}

  isGetOtpClicked: boolean = false;
  hasReceivedOtp: boolean = false;
  resendOtpTimer: number = 60;

  goToSelection(email: string, password: string){
    if(!email || !password){
      alert('Email or Password cannot be empty!');
      return;
    }
    this.http.post('http://localhost:5000/api/login', {phoneNumber: email, password: password}).subscribe((res:any) => {
      console.log(res);
      this.dataService.authToken = res.token;
      localStorage.setItem('washndryAuthToken', this.dataService.authToken);
      this.router.navigate(['selection']);
    }, (error)=> {
      alert(error.error.message);
    })
  }

}
