import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalAmountSectionComponent } from './total-amount-section.component';

describe('TotalAmountSectionComponent', () => {
  let component: TotalAmountSectionComponent;
  let fixture: ComponentFixture<TotalAmountSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalAmountSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TotalAmountSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
