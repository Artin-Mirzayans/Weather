import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherItemComponent } from './weather-item.component';

describe('WeatherItemComponent', () => {
  let component: WeatherItemComponent;
  let fixture: ComponentFixture<WeatherItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeatherItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WeatherItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
