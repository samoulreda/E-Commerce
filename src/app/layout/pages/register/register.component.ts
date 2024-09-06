
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../..//project/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  errorMessage !: string;
  loader: boolean = false;
  constructor(private _AuthService: AuthService, private routes: Router) { }



  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
    rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  },
    this.passwordMatchValidator
  );

  passwordMatchValidator(form: any) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  register() {
    this.loader = true;
    this._AuthService.handelRegister(this.registerForm.value).subscribe({
      next: (data) => {
        this.loader = false;
        this.routes.navigate(['/login']);
      },
      error: (err) => {
        this.loader = false;
        this.errorMessage = err.error.message;
      }
    })
  }
}
