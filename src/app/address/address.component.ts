import { Component } from '@angular/core';
import { TotalAmountSectionComponent } from "../total-amount-section/total-amount-section.component";

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [TotalAmountSectionComponent],
  templateUrl: './address.component.html',
  styleUrl: './address.component.css'
})
export class AddressComponent {

}
