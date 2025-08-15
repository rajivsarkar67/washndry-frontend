import { Component, OnInit } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { CommonModule, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [TotalAmountSectionComponent, CommonModule, HeaderComponent, DatePipe],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.css'
})
export class ScheduleComponent implements OnInit{

  datesToShow: any = [];
  // timeSlots=['7am-10am','10am-1pm','1pm-4pm','4pm-7pm','7pm-10pm'];
  timeSlots=['7pm-10pm'];


  constructor(private router: Router, public dataService: DataService){}

  ngOnInit(){
    this.datesToShow = this.getWeekDays();
    this.datesToShow.shift();
    this.dataService.selectedDate = undefined;
    this.selectTimeSlot('7pm-10pm');    // current functionality for default selection of the only time slot
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
    this.dataService.selectedDate = date;
  }

  selectTimeSlot(timeSlot: string){
    this.dataService.selectedTimeSlot = timeSlot;
  }

  navigateToNextPage(){
    console.log("navigateToNextPage called");
    console.log(this.dataService.selectedDate);
    console.log(new Date());
    console.log(this.dataService.selectedDate === new Date());
    if(this.dataService.selectedDate === undefined || this.dataService.selectedTimeSlot===''){
      alert('Please select a date and time slot first');
      return;
    }
    else{
      localStorage.setItem('washndrySelectedDate', this.dataService.selectedDate.toString());
      localStorage.setItem('washndrySelectedTimeSlot', this.dataService.selectedTimeSlot);
      this.router.navigate(['address']);
    }
  }
}
