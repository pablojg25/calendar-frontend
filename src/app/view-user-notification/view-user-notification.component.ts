import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UsernotifsService } from '../services/usernotifs/usernotifs.service';

@Component({
  selector: 'app-view-user-notification',
  imports: [RouterModule],
  templateUrl: './view-user-notification.component.html',
  styleUrl: './view-user-notification.component.css'
})
export class ViewUserNotificationComponent {

  notification: any;

  constructor(private userNotifsService:UsernotifsService, private router:Router) {}

  ngOnInit(): void {
    this.notification = history.state.notif;
    console.log(this.notification);
  }

  deleteNotif() {
    this.userNotifsService.deleteNotif(this.notification.id).subscribe({
      complete: () => {
        this.router.navigate(['']);
        }
    })
  }

}
