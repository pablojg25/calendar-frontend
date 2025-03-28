import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUserNotificationComponent } from './create-user-notification.component';

describe('CreateUserNotificationComponent', () => {
  let component: CreateUserNotificationComponent;
  let fixture: ComponentFixture<CreateUserNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUserNotificationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUserNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
