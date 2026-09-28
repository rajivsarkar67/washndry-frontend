import { ChangeDetectionStrategy, Component, EventEmitter, input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
    selector: 'app-total-amount-section',
    imports: [],
    templateUrl: './total-amount-section.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrl: './total-amount-section.component.css'
})
export class TotalAmountSectionComponent {
  btnLabel = input('');
  btnDisabled = input(false);
  @Output() emitNavigate = new EventEmitter<undefined>();

  constructor(public dataService: DataService){}

  ngOnInit(){
    if (typeof localStorage !== 'undefined' && localStorage.getItem('washdrySelection')){
      this.dataService.itemsList.set(JSON.parse(localStorage.getItem('washdrySelection') as string));
      this.dataService.calculateTotalItemsAndPrice();
    }
  }

  navigateToNextPage(){
    this.emitNavigate.emit();
  }
}
