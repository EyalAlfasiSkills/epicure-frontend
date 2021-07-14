import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishPreviewComponent } from './dish-preview.component';

describe('DishPreviewComponent', () => {
  let component: DishPreviewComponent;
  let fixture: ComponentFixture<DishPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishPreviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DishPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
