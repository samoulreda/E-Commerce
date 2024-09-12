import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../project/services/auth.service';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink,RouterLinkActive],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  errorMessage !: string;
  loader: boolean = false;
  constructor(private _AuthService: AuthService, private routes: Router) {}

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
  },
  );

  login() {
    this.loader = true;
    this._AuthService.handelLogin(this.loginForm.value).subscribe({
      next: (data) => {

        localStorage.setItem('userToken',data.token);
        this._AuthService.getUser()
        this.loader = false;
        this.routes.navigate(['/home']);
      },
      error: (err) => {
        this.loader = false;
        // this.errorMessage = err.error.message;
      }
    })
  }
}
