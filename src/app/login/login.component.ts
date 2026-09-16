import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private dataService: DataService,
    private http: HttpClient,
    private validationService: ValidationService
  ){}

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
    this.http.post('http://localhost:5001/api/login', {phoneNumber: phoneNumber, password: password}).subscribe((res:any) => {
      this.dataService.authToken = res.token;
      this.dataService.userType = res.type;
      localStorage.setItem('washdryAuthToken', this.dataService.authToken);
      localStorage.setItem('washdryUserType', this.dataService.userType);

      const pendingOrder = localStorage.getItem('washdryPendingOrder');
      if (this.dataService.userType === 'user' && pendingOrder) {
        const payload = JSON.parse(pendingOrder);
        const headers = { 'Authorization': 'Bearer ' + this.dataService.authToken };

        this.http.post('http://localhost:5001/api/orders', payload, { headers }).subscribe((orderRes:any) => {
          localStorage.removeItem('washdrySelection');
          localStorage.removeItem('washdrySelectedDate');
          localStorage.removeItem('washdrySelectedTimeSlot');
          localStorage.removeItem('washdryPendingOrder');
          this.dataService.emptyItemsList();
          this.router.navigate(['orders-list']);
        }, (error)=> {
          alert(error.error.message || 'Unable to place order. Please try again.');
        });
        return;
      }

      const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || (this.dataService.userType === 'admin' ? '/admin-panel' : '/selection');
      const normalizedReturnUrl = returnUrl.startsWith('/') ? returnUrl : `/${returnUrl}`;

      if(this.dataService.userType === 'user'){
        this.router.navigateByUrl(normalizedReturnUrl);
      }
      else if(this.dataService.userType === 'admin'){
        this.router.navigateByUrl('/admin-panel');
      }
    }, (error)=> {
      alert(error.error.message);
    })
  }

}
