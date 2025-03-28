import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsernotifsService } from '../../services/usernotifs/usernotifs.service';
import { UserNotif } from '../../models/usernotifs';
import { UserNotifRequest } from '../../models/userNotifRequest';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-user-notification',
  imports: [
    ReactiveFormsModule, 
    RouterModule,
    CommonModule
  ],
  templateUrl: './update-user-notification.component.html',
  styleUrl: './update-user-notification.component.css'
})
export class UpdateUserNotificationComponent implements OnInit {

  @Input() notif: UserNotif = {
    id: 0,
    title: '',
    content: '',
    type: '',
    date: new Date(),
    expired: false
  };
  notifForm!: FormGroup;
  notifTypes:String[] = [];
  errorMessage:String = '';
  @Output() changeUpdatingEvent = new EventEmitter<void>();

  constructor(private formBuilder:FormBuilder,private router:Router,private userNotifsService:UsernotifsService) {}

  ngOnInit(): void {
    this.notifForm = this.formBuilder.group({
      title:[this.notif.title,[Validators.required]],
      content:[this.notif.content,[Validators.required]],
      date:[this.formatDate(this.notif.date),[Validators.required]],
      type:[this.notif.type,[Validators.required]]
    });

    this.userNotifsService.getNotifTypes().subscribe({
      next: notifTypes => {this.notifTypes=notifTypes}
    });
  }

  updateNotif() {
    if (this.notifForm.valid) {
          this.userNotifsService.updateNotif(this.notif.id,this.notifForm.value as UserNotifRequest).subscribe({
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

  hideForm() {
    this.notifForm.reset();
    this.changeUpdatingEvent.emit();
  }

  private formatDate(date: Date | string): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  }

  get title() {
    return this.notifForm.controls['title'];
  }

  get content() {
    return this.notifForm.controls['content'];
  }

  get date() {
    return this.notifForm.controls['date'];
  }

  get type() {
    return this.notifForm.controls['type'];
  }

}
