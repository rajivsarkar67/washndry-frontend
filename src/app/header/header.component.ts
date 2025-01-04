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

  isLoggedIn: boolean = false;

  constructor(private router: Router, public dataService: DataService){
    console.log(localStorage.getItem('isLoggedIn'));
    if(localStorage.getItem('isLoggedIn') === 'true'){
      this.isLoggedIn = true;
    }
    else{
      this.isLoggedIn = false;
    }
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    localStorage.setItem('isLoggedIn', 'false');
    this.dataService.emptyItemsList();
    this.router.navigate(['login']);
  }
}
