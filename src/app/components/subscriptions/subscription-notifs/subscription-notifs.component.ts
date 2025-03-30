import { Component } from '@angular/core';
import { SubscriptionsService } from '../../../services/subscriptions/subscriptions.service';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscription-notifs',
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './subscription-notifs.component.html',
  styleUrl: './subscription-notifs.component.css'
})
export class SubscriptionNotifsComponent {

  subscriptions?:User[];
  email:String = '';
  user?:User;

  constructor(private subscriptionService:SubscriptionsService, private router:Router) {
    this.subscriptionService.getSubscriptions().subscribe({
      next: (data) => {this.subscriptions = data},
      complete: () => {console.log(this.subscriptions)}
    })
  }

  searchUser() {
    console.log(this.email);
    this.subscriptionService.getUser(this.email).subscribe({
      next: (data) => {
        console.log(data),
        this.user = data
      },
      complete: () => {
        this.router.navigate(['/subscription-info'], {
          state: { user: this.user }
        });
      }
    });
  }

  

}
