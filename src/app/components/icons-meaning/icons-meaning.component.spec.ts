import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconsMeaningComponent } from './icons-meaning.component';

describe('IconsMeaningComponent', () => {
  let component: IconsMeaningComponent;
  let fixture: ComponentFixture<IconsMeaningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IconsMeaningComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IconsMeaningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
