import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChefOfTheWeekComponent } from './chef-of-the-week.component';

describe('ChefOfTheWeekComponent', () => {
  let component: ChefOfTheWeekComponent;
  let fixture: ComponentFixture<ChefOfTheWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChefOfTheWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChefOfTheWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
