import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RegisterService } from '../../services/register/register.service';
import { RegisterRequest } from '../../services/register/registerRequest';

@Component({
  selector: 'app-register',
  imports: [
    ReactiveFormsModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm;
  errorMessage:String = '';

  constructor(private formBuilder:FormBuilder,private router:Router, private registerService:RegisterService) {
    this.registerForm = this.formBuilder.group({
      username:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]]
    })
  }

  register() {
    if (this.registerForm.valid) {
      this.registerService.register(this.registerForm.value as RegisterRequest).subscribe({
        next: (userData) => {
          this.errorMessage = userData.status == 201 ? "" : userData.message;
        },
        error: (errorData) => {
          this.errorMessage = errorData;
        },
        complete: () => {
          if (this.errorMessage == "") {
            this.registerForm.reset();
            this.router.navigate(['']);
          }
        }
      })
    }
  }

  redirectToLogin() {
    this.registerForm.reset();
    this.router.navigate(['login']);
  }

  get username() {
    return this.registerForm.controls.username;
  }

  get email() {
    return this.registerForm.controls.email;
  }

  get password() {
    return this.registerForm.controls.password;
  }

}
