import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylizedButtonSearchComponent } from './stylized-button-search.component';

describe('StylizedButtonSearchComponent', () => {
  let component: StylizedButtonSearchComponent;
  let fixture: ComponentFixture<StylizedButtonSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylizedButtonSearchComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StylizedButtonSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
