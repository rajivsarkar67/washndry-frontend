import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('calculates totals from item quantities', () => {
    service.itemsList.update(items => items.map((item, index) => ({
      ...item,
      quantity: index === 0 ? 2 : 0
    })));

    service.calculateTotalItemsAndPrice();

    expect(service.totalItems()).toBe(2);
    expect(service.totalPrice()).toBe(16);
  });

  it('resets the basket and schedule state', () => {
    service.itemsList.update(items => items.map(item => ({...item, quantity: 2})));
    service.calculateTotalItemsAndPrice();
    service.selectedTimeSlot.set('7am-10am');

    service.emptyItemsList();

    expect(service.itemsList().every(item => item.quantity === 0)).toBeTrue();
    expect(service.totalItems()).toBe(0);
    expect(service.totalPrice()).toBe(0);
    expect(service.selectedDate()).toEqual(jasmine.any(Date));
    expect(service.selectedTimeSlot()).toBe('');
  });
});
