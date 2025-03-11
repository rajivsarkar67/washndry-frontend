import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../validation.service';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent {

  constructor(private http: HttpClient, private validationService: ValidationService, private router: Router){}

  isPhoneNumberChecked: boolean = false;

  verifyPhoneNumber(phoneNumber: number){
    if(!this.validationService.checkPhoneNumber(phoneNumber)){
      alert('Phone Number should be 10 digits starting with 6,7,8 or 9');
      return;
    }
    this.http.get(`http://localhost:5000/api/check-phone?phoneNumber=${phoneNumber}`).subscribe((res:any) => {
      if(res.exists){
        this.isPhoneNumberChecked = true;
      }
      else{
        alert('This phone number is not registered.');
      }
    }, (error)=> {
      alert(error.error.message);
    })
  }

  setNewPassword(phone: number, password: string, confirmPassword: string){
    if(!password || !confirmPassword){
      alert('Password fields cannot be empty');
      return;
    }
    if(password !== confirmPassword){
      alert('Password and Confirm Password should match');
      return;
    }
    this.http.post('http://localhost:5000/api/reset-password', {phoneNumber: phone, newPassword: password}).subscribe((res:any) => {
      this.router.navigate(['login']);
    }, (error)=> {
      alert(error.error.message);
    })
  }

}
