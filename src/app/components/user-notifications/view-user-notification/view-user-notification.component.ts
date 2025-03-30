import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UpdateUserNotificationComponent } from '../update-user-notification/update-user-notification.component';
import { UsernotifsService } from '../../../services/usernotifs/usernotifs.service';

@Component({
  selector: 'app-view-user-notification',
  imports: [
    RouterModule,
    CommonModule,
    UpdateUserNotificationComponent
  ],
  templateUrl: './view-user-notification.component.html',
  styleUrl: './view-user-notification.component.css'
})
export class ViewUserNotificationComponent {

  notification: any;
  updating:Boolean = false;

  constructor(private userNotifsService:UsernotifsService, private router:Router) {}

  ngOnInit(): void {
    this.notification = history.state.notif;
  }

  updateNotif() {
    this.updating=!this.updating;
  }

  deleteNotif() {
    this.userNotifsService.deleteNotif(this.notification.id).subscribe({
      complete: () => {
        this.router.navigate(['']);
        }
    })
  }

}
