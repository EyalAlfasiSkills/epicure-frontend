import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewItemsListComponent } from './preview-items-list.component';

describe('PreviewItemsListComponent', () => {
  let component: PreviewItemsListComponent;
  let fixture: ComponentFixture<PreviewItemsListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewItemsListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreviewItemsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
