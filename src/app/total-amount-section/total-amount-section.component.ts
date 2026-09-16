import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-total-amount-section',
  standalone: true,
  imports: [],
  templateUrl: './total-amount-section.component.html',
  styleUrl: './total-amount-section.component.css'
})
export class TotalAmountSectionComponent {
  @Input() btnLabel: string = '';
  @Input() btnDisabled: boolean = false;
  @Output() emitNavigate = new EventEmitter<undefined>();

  constructor(public dataService: DataService){}

  ngOnInit(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('washdrySelection')){
      this.dataService.itemsList = JSON.parse(localStorage.getItem('washdrySelection') as string);
      this.dataService.calculateTotalItemsAndPrice();
    }
  }

  navigateToNextPage(){
    this.emitNavigate.emit();
  }
}
