import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UserNotifRequest } from '../../models/userNotifRequest';
import { UsernotifsService } from '../../services/usernotifs/usernotifs.service';

@Component({
  selector: 'app-create-user-notification',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './create-user-notification.component.html',
  styleUrl: './create-user-notification.component.css'
})
export class CreateUserNotificationComponent {

  notifForm;
  notifTypes:String[] = [];
  errorMessage:String = '';

  constructor(private formBuilder:FormBuilder,private router:Router,private userNotifsService:UsernotifsService) {

    this.notifForm = this.formBuilder.group({
      title:['',[Validators.required]],
      content:['',[Validators.required]],
      date:['',[Validators.required]],
      type:['',[Validators.required]]
    });

    this.userNotifsService.getNotifTypes().subscribe({
      next: notifTypes => {this.notifTypes=notifTypes}
    });
  }

  createNotif() {
    if (this.notifForm.valid) {
          this.userNotifsService.createNotif(this.notifForm.value as UserNotifRequest).subscribe({
            error: (errorData) => {
              this.errorMessage = errorData;
            },
            complete: () => {
              if (this.errorMessage == "") {
                this.notifForm.reset();
                this.router.navigate(['']);
              }
            }
          })
        }
  }

  get title() {
    return this.notifForm.controls.title;
  }

  get content() {
    return this.notifForm.controls.content;
  }

  get date() {
    return this.notifForm.controls.date;
  }

  get type() {
    return this.notifForm.controls.type;
  }


}
