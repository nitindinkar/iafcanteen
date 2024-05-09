import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminNotificationComponent } from './super-admin-notification.component';

describe('SuperAdminNotificationComponent', () => {
  let component: SuperAdminNotificationComponent;
  let fixture: ComponentFixture<SuperAdminNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SuperAdminNotificationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SuperAdminNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
