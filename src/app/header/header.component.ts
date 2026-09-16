import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  washdryIsLoggedIn: boolean = false;

  constructor(private router: Router, public dataService: DataService){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('washdryAuthToken')) {
      this.washdryIsLoggedIn = true;
    }
    else{
      this.washdryIsLoggedIn = false;
    }
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    localStorage.removeItem('washdryAuthToken');
    localStorage.removeItem('washdryUserType');
    localStorage.removeItem('washdrySelection');
    localStorage.removeItem('washdrySelectedDate');
    localStorage.removeItem('washdrySelectedTimeSlot');
    localStorage.removeItem('washdryPendingOrder');
    this.dataService.emptyItemsList();
    this.router.navigate(['login']);
  }
}
