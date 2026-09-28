import { ChangeDetectionStrategy, Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-header',
    imports: [],
    templateUrl: './header.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './header.component.css'
})
export class HeaderComponent {

  washdryIsLoggedIn = computed(() => this.dataService.authToken().length > 0);

  constructor(private router: Router, public dataService: DataService){}

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
    this.dataService.authToken.set('');
    this.dataService.userType.set('');
    this.dataService.emptyItemsList();
    this.router.navigate(['login']);
  }
}
