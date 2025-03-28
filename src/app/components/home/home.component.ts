import { Component } from '@angular/core';
import { UserNotif } from '../../models/usernotifs';
import { UsernotifsService } from '../../services/usernotifs/usernotifs.service';
import { UserNotificationComponent } from '../user-notification/user-notification.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    RouterModule,
    UserNotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  userLoggedIn:boolean = false;
  notifications?:UserNotif[] = [];
  errorMessage:String = '';

  constructor(private userNotifsService:UsernotifsService) {}

  ngOnInit() {
    this.userLoggedIn = sessionStorage.getItem("token") != null;
    if (this.userLoggedIn) {
      this.userNotifsService.getNotifs().subscribe({
        next: (notifications) => {
          this.notifications = notifications;
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        }
    })
    }
  }

  get noNotifications(): boolean {
    return (this.notifications?.length ?? 0) === 0;
  }

}
