import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ValidationService } from '../validation.service';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient, private validationService: ValidationService){}

  goToLogin(phone: number, password: string, confirmPassword: string){
    if(!phone || !password || !confirmPassword){
      alert('Fields cannot be empty!');
      return;
    }
    if(!this.validationService.checkPhoneNumber(phone)){
      alert('Phone Number should be 10 digits starting with 6,7,8 or 9');
      return;
    }
    this.http.post('http://localhost:5000/api/signup',{phoneNumber: phone, password: password, confirmPassword: confirmPassword}).subscribe(res => {
      console.log(res);
      this.router.navigate(['login']);
    }, (error)=>{
      alert(error.error.message);
    });
  }

}
