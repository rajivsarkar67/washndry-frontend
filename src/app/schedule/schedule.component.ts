import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TotalAmountSectionComponent, CommonModule],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent {

  constructor(private router: Router){}

  datesToShow = [{date: 4, day: 'Sun'},{date: 5, day: 'Mon'},{date: 6, day: 'Tue'},{date: 7, day: 'Wed'},{date: 8, day: 'Thu'},{date: 9, day: 'Fri'},{date: 10, day: 'Sat'}]
  timeSlots=['8am-10am','10am-12pm','12pm-2pm','2pm-4pm','4pm-6pm','6pm-8pm'];

  selectedDate = 0;
  selectedTimeSlot = '';

  selectDate(date: number){
    this.selectedDate = date;
  }

  selectTimeSlot(timeSlot: string){
    this.selectedTimeSlot = timeSlot;
  }

  navigateToNextPage(){
    if(this.selectedDate === 0 || this.selectedTimeSlot===''){
      alert('Please select a date and time slot first');
      return;
    }
    this.router.navigate(['address']);
  }
}
