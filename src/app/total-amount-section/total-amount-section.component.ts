import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-total-amount-section',
  standalone: true,
  imports: [],
  templateUrl: './total-amount-section.component.html',
  styleUrl: './total-amount-section.component.css'
})
export class TotalAmountSectionComponent {
  @Input() btnLabel: string = '';
  @Output() emitNavigate = new EventEmitter<undefined>();

  constructor(private router: Router){}

  navigateToNextPage(){
    this.emitNavigate.emit();
  }
}
