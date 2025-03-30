import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { TokenService } from '../../services/jwt/token.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-info',
  imports: [RouterModule],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent {

  user?:User;

  constructor(private userService:UserService, private tokenService:TokenService, private router:Router) {
    this.userService.getUser().subscribe({
      next: (user) => {this.user = user}
    })
  }

  deleteUser() {
    this.userService.deleteUser().subscribe();
    this.tokenService.logout();
    this.router.navigate(['']);
  }

  changeVisibility() {
    this.userService.changeVisibility().subscribe({
      next: (user) => {this.user = user}
    });
  }

}
