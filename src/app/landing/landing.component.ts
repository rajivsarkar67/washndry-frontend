import { Component, ChangeDetectionStrategy } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { Router } from '@angular/router';

@Component({
    selector: 'app-landing',
    imports: [HeaderComponent],
    templateUrl: './landing.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrl: './landing.component.css'
})
export class LandingComponent {

  constructor(private router: Router){}

  goToSelection(){
    this.router.navigate(['selection']);
  }
}
