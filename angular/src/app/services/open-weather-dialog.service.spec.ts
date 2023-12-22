import { TestBed } from '@angular/core/testing';

import { OpenWeatherDialogService } from './open-weather-dialog.service';

describe('OpenWeatherDialogService', () => {
  let service: OpenWeatherDialogService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenWeatherDialogService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
