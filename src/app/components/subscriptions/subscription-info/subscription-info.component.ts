import { Component, Input, OnInit } from '@angular/core';
import { User } from '../../../models/user';
import { Router, RouterModule } from '@angular/router';
import { SubscriptionsService } from '../../../services/subscriptions/subscriptions.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-subscription-info',
  imports: [
    RouterModule,
    CommonModule
  ],
  templateUrl: './subscription-info.component.html',
  styleUrl: './subscription-info.component.css'
})
export class SubscriptionInfoComponent {

  user?:User;
  subscribed?:Boolean;

  constructor(private subscriptionService:SubscriptionsService) {
    this.user = history.state.user;
    if (this.user != null) {
      this.subscriptionService.checkSubscription(this.user.email).subscribe({
        next: (data) => {this.subscribed = data}
      })
    }
  }

  subscribe() {
    if (this.user != null) {
      this.subscriptionService.subscribe(this.user?.email).subscribe({
        next: () => {this.subscribed = true}
      })
    }
  }


}
