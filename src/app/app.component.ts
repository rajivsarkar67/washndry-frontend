import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataService } from './data.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet],
    templateUrl: './app.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
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
        this.dataService.authToken.set(localStorage.getItem('washdryAuthToken') as string);
      }
      if(localStorage.getItem('washdryUserType')){
        this.dataService.userType.set(localStorage.getItem('washdryUserType') as string);
      }
      if(localStorage.getItem('washdrySelection')){
        this.dataService.itemsList.set(JSON.parse(localStorage.getItem('washdrySelection') as string));
        this.dataService.calculateTotalItemsAndPrice();
      }
      if(localStorage.getItem('washdrySelectedDate')){
        this.dataService.selectedDate.set(new Date(localStorage.getItem('washdrySelectedDate') as string));
      }
      if(localStorage.getItem('washdrySelectedTimeSlot')){
         this.dataService.selectedTimeSlot.set(localStorage.getItem('washdrySelectedTimeSlot') as string);
      }
    }
  }

}
