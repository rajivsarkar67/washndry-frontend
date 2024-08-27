import { Component, OnInit } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TotalAmountSectionComponent, CommonModule, HeaderComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{

  datesToShow: any = [];
  timeSlots=['8am-10am','10am-12pm','12pm-2pm','2pm-4pm','4pm-6pm','6pm-8pm'];

  selectedDate = 0;
  selectedTimeSlot = '';

  constructor(private router: Router){}

  ngOnInit(){
    this.datesToShow = this.getWeekDays();
    this.datesToShow.shift();
  }

  getWeekDays() {
      const today = new Date();
      const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      
      return Array.from({ length: 8 }, (_, i) => {
          const date = new Date(today);
          date.setDate(today.getDate() + i);
          
          return {
              day: daysOfWeek[date.getDay()],
              date: date.getDate() // Get only the day of the month
          };
    });
  }

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
