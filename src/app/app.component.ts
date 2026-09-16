import { Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(public dataService: DataService){}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    // Customize the warning message
    event.preventDefault();
  }

  ngOnInit(){
    if (typeof localStorage !== 'undefined') {
      if(localStorage.getItem('washdryAuthToken')){
        this.dataService.authToken = localStorage.getItem('washdryAuthToken') as string;
      }
      if(localStorage.getItem('washdryUserType')){
        this.dataService.userType = localStorage.getItem('washdryUserType') as string;
      }
      if(localStorage.getItem('washdrySelection')){
        this.dataService.itemsList = JSON.parse(localStorage.getItem('washdrySelection') as string);
      }
      if(localStorage.getItem('washdrySelectedDate')){
        this.dataService.selectedDate = localStorage.getItem('washdrySelectedDate') as any;
      }
      if(localStorage.getItem('washdrySelectedTimeSlot')){
         this.dataService.selectedTimeSlot = localStorage.getItem('washdrySelectedTimeSlot') as string; 
      }
    }
  }

}
