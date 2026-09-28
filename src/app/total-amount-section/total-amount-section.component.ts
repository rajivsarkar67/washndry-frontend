import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-total-amount-section',
    imports: [],
    templateUrl: './total-amount-section.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
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
