import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityModalComponent } from './add-entity-modal.component';

describe('AddEntityModalComponent', () => {
  let component: AddEntityModalComponent;
  let fixture: ComponentFixture<AddEntityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEntityModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
