import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { LoginRequest } from '../../models/LoginRequest';

@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm;
  errorMessage:String = '';

  constructor(private formBuilder:FormBuilder,private router:Router, private loginService:LoginService) {
    this.loginForm = this.formBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login() {
    if (this.loginForm.valid) {
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
            next: (userData) => {
              this.errorMessage = userData.status == 200 ? "" : userData.message;
            },
            error: (errorData) => {
              this.errorMessage = errorData;
            },
            complete: () => {
              if (this.errorMessage == "") {
                this.loginForm.reset();
                this.router.navigate(['']);
              }
            }
          })
    }
  }

  get username() {
    return this.loginForm.controls.username;
  }

  get password() {
    return this.loginForm.controls.password;
  }


}
