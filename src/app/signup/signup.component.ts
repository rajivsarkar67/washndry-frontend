import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  constructor(private router: Router, private http: HttpClient){}

  goToLogin(phone: string, name: string, password: string, confirmPassword: string){
    this.http.post('http://localhost:5000/api/register',{phoneNumber: phone, name: name, password: password, confirmPassword: confirmPassword}).subscribe(res => {
      console.log(res);
      this.router.navigate(['login']);
    }, (error)=>{
      alert(error.error.message);
    });
  }

}
