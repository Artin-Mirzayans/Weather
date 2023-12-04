import { TestBed } from '@angular/core/testing';

import { WeatherDialogService } from './weather-dialog.service';

describe('WeatherDialogService', () => {
  let service: WeatherDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WeatherDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
