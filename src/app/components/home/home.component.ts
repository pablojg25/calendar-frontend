import { Component } from '@angular/core';
import { UserNotif } from '../../services/usernotifs/usernotifs';
import { UsernotifsService } from '../../services/usernotifs/usernotifs.service';
import { UserNotificationComponent } from '../user-notification/user-notification.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [
    CommonModule,
    UserNotificationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  notifications?:UserNotif[] = [];
  errorMessage:String = '';

  constructor(private userNotifsService:UsernotifsService) {}

  ngOnInit() {
    this.userNotifsService.getNotifs().subscribe({
        next: (notifications) => {
          this.notifications = notifications;
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        }
    })
  }

  get noNotifications(): boolean {
    return (this.notifications?.length ?? 0) === 0;
  }

}
