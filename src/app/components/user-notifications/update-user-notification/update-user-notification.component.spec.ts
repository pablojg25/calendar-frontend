import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateUserNotificationComponent } from './update-user-notification.component';

describe('UpdateUserNotificationComponent', () => {
  let component: UpdateUserNotificationComponent;
  let fixture: ComponentFixture<UpdateUserNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateUserNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateUserNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
