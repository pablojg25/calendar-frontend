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
  view:String = 'today';

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

  noNotifications(notifications:UserNotif[]): boolean {
    return (notifications?.length ?? 0) === 0;
  }

  deletePastNotifs(): void {
    this.userNotifsService.deletePastNotifs().subscribe({
      next: () => {
        if (this.notifications) {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          this.notifications = this.notifications.filter(notif => {
            const notifDate = new Date(notif.date);
            notifDate.setHours(0, 0, 0, 0);
            return notifDate >= today;
          });
        }
      },
      error: (errorData) => {
        this.errorMessage = errorData;
      }
  })
  }

  get pastNotifications():UserNotif[] {
    if (this.notifications) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.notifications.filter(notif => {
        const notifDate = new Date(notif.date);
        notifDate.setHours(0, 0, 0, 0);
        return notifDate < today;
      });
    }
    return [];
  }

  
  get todayNotifications():UserNotif[] {
    if (this.notifications) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.notifications.filter(notif => {
        const notifDate = new Date(notif.date);
        notifDate.setHours(0, 0, 0, 0);
        return notifDate.getTime() === today.getTime();
      });
    }
    return [];
  }

  get futureNotifications():UserNotif[] {
    if (this.notifications) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return this.notifications.filter(notif => {
        const notifDate = new Date(notif.date);
        notifDate.setHours(0, 0, 0, 0);
        return notifDate > today;
      });
    }
    return [];
  }

  get typeNotifications():UserNotif[] {
    if (this.notifications) {
      return this.notifications.filter(notif => {
        return notif.type==this.view;
      });
    }
    return [];
  }

  changeView(view:String):void {
    this.view=view;
  }

}
