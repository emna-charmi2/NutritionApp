import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FitnessJourneyPage } from './fitness-journey.page';

describe('FitnessJourneyPage', () => {
  let component: FitnessJourneyPage;
  let fixture: ComponentFixture<FitnessJourneyPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FitnessJourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
