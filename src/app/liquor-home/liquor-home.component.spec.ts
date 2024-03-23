import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LiquorHomeComponent } from './liquor-home.component';

describe('LiquorHomeComponent', () => {
  let component: LiquorHomeComponent;
  let fixture: ComponentFixture<LiquorHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiquorHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LiquorHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
