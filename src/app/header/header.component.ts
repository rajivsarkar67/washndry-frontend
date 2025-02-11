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

  washndryIsLoggedIn: boolean = false;

  constructor(private router: Router, public dataService: DataService){
    if(localStorage.getItem('washndryIsLoggedIn') === 'true'){
      this.washndryIsLoggedIn = true;
    }
    else{
      this.washndryIsLoggedIn = false;
    }
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    localStorage.setItem('washndryIsLoggedIn', 'false');
    this.dataService.emptyItemsList();
    this.router.navigate(['login']);
  }
}
