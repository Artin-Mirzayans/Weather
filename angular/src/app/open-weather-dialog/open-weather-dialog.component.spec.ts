import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenWeatherDialogComponent } from './open-weather-dialog.component';

describe('OpenWeatherDialogComponent', () => {
  let component: OpenWeatherDialogComponent;
  let fixture: ComponentFixture<OpenWeatherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenWeatherDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OpenWeatherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
