import { ChangeDetectionStrategy, Component, OnInit, signal } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
    selector: 'app-schedule',
    imports: [TotalAmountSectionComponent, CommonModule, HeaderComponent, DatePipe],
    templateUrl: './schedule.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{

  datesToShow = signal<any[]>([]);
  // timeSlots=['7am-10am','10am-1pm','1pm-4pm','4pm-7pm','7pm-10pm'];
  timeSlots=['7am-10am'];


  constructor(private router: Router, public dataService: DataService){}

  ngOnInit(){
    this.datesToShow.set(this.getWeekDays().slice(1));
    this.dataService.selectedDate.set(undefined);
    this.selectTimeSlot('7am-10am');    // current functionality for default selection of the only time slot
  }

  getWeekDays() {
      const today = new Date();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      return Array.from({ length: 8 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          
          return {
              day: daysOfWeek[date.getDay()],
              date: date // Get only the day of the month
          };
    });
  }

  selectDate(date: Date){
    this.dataService.selectedDate.set(date);
  }

  selectTimeSlot(timeSlot: string){
    this.dataService.selectedTimeSlot.set(timeSlot);
  }

  navigateToNextPage(){
    console.log("navigateToNextPage called");
    const selectedDate = this.dataService.selectedDate();
    const selectedTimeSlot = this.dataService.selectedTimeSlot();
    if(selectedDate === undefined || selectedTimeSlot === ''){
      alert('Please select a date and time slot first');
      return;
    }
    else{
      localStorage.setItem('washdrySelectedDate', selectedDate.toString());
      localStorage.setItem('washdrySelectedTimeSlot', selectedTimeSlot);
      this.router.navigate(['address']);
    }
  }
}
