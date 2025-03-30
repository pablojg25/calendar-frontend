import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserNotificationComponent } from './view-user-notification.component';

describe('ViewUserNotificationComponent', () => {
  let component: ViewUserNotificationComponent;
  let fixture: ComponentFixture<ViewUserNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewUserNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
