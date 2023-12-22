import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWeatherDialogComponent } from './add-weather-dialog.component';

describe('AddWeatherDialogComponent', () => {
  let component: AddWeatherDialogComponent;
  let fixture: ComponentFixture<AddWeatherDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddWeatherDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddWeatherDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
