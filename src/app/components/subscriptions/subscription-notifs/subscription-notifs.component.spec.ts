import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionNotifsComponent } from './subscription-notifs.component';

describe('SubscriptionNotifsComponent', () => {
  let component: SubscriptionNotifsComponent;
  let fixture: ComponentFixture<SubscriptionNotifsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubscriptionNotifsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionNotifsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
