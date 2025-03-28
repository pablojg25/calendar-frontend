import { Component, Input } from '@angular/core';
import { UserNotif } from '../../models/usernotifs';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-notification',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './user-notification.component.html',
  styleUrl: './user-notification.component.css'
})
export class UserNotificationComponent {


  @Input() notif!: UserNotif;

  constructor(private router:Router) {
  }

  showNotifDetails() {
    this.router.navigate(['/user-notification'], {
      state: { notif: this.notif }
    });
  }

}
