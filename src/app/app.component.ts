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
  constructor(private dataService: DataService){}

  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: BeforeUnloadEvent): void {
    // Customize the warning message
    event.preventDefault();
  }

  ngOnInit(){
    if(localStorage.getItem('washndryAuthToken')){
      this.dataService.authToken = localStorage.getItem('washndryAuthToken') as string;
    }
    if(localStorage.getItem('washndrySelection')){
      this.dataService.itemsList = JSON.parse(localStorage.getItem('washndrySelection') as string);
    }
    if(localStorage.getItem('washndrySelectedDate')){
      this.dataService.selectedDate = localStorage.getItem('washndrySelectedDate') as string;
    }
    if(localStorage.getItem('washndrySelectedTimeSlot')){
       this.dataService.selectedTimeSlot = localStorage.getItem('washndrySelectedTimeSlot') as string; 
    }
  }

}
