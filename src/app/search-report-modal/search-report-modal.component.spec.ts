import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchReportModalComponent } from './search-report-modal.component';

describe('SearchReportModalComponent', () => {
  let component: SearchReportModalComponent;
  let fixture: ComponentFixture<SearchReportModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchReportModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchReportModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
