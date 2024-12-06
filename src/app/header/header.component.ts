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

  constructor(private router: Router, public dataService: DataService){}

  goToLogin(){
    this.router.navigate(['login']);
  }

  logout(){
    this.dataService.isLoggedIn = false;
    this.dataService.emptyItemsList();
    this.router.navigate(['login']);
  }
}
