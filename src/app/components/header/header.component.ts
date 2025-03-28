import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { LoginService } from '../../services/login/login.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  
  userLoggedIn:boolean = false;

  constructor(private registerService:RegisterService, private loginService:LoginService, private router:Router) {}

  ngOnInit(): void {
    this.registerService.currentUserToken.subscribe({
      next:(user => {
        this.userLoggedIn = (user != '');
      })
    })
    this.loginService.currentUserToken.subscribe({
      next:(user => {
        this.userLoggedIn = (user != '');
      })
    })
  }

  logout(): void {
    sessionStorage.removeItem("token");
    this.userLoggedIn = false;
    this.router.navigate(['home']);
  }

}
