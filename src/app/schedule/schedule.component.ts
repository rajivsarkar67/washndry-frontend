import { Component, OnInit } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { DataService } from '../data.service';

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

  constructor(private router: Router, public dataService: DataService){}

  ngOnInit(){
    this.datesToShow = this.getWeekDays();
    this.datesToShow.shift();
    if(localStorage.getItem('washndrySelectedDate')){
    this.dataService.selectedDate = localStorage.getItem('washndrySelectedDate') as string;
    }
    if(localStorage.getItem('washndrySelectedTimeSlot')){
     this.dataService.selectedTimeSlot = localStorage.getItem('washndrySelectedTimeSlot') as string; 
    }
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

  selectDate(date: string){
    this.dataService.selectedDate = date;
  }

  selectTimeSlot(timeSlot: string){
    this.dataService.selectedTimeSlot = timeSlot;
  }

  navigateToNextPage(){
    if(this.dataService.selectedDate === '' || this.dataService.selectedTimeSlot===''){
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
