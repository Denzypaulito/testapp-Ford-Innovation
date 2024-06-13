import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StylizedButton2Component } from './stylized-button2.component';

describe('StylizedButton2Component', () => {
  let component: StylizedButton2Component;
  let fixture: ComponentFixture<StylizedButton2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [StylizedButton2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StylizedButton2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
