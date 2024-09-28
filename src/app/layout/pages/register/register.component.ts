
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../..//project/services/Auth/auth.service';
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
  mgSuccess: boolean = false;

  constructor(private _AuthService: AuthService, private routes: Router, private _FormBuilder: FormBuilder) { }

  registerForm: FormGroup = this._FormBuilder.group({
    name: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]],
    email: [null, [Validators.required, Validators.email]],
    password: [null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]],
    rePassword: [null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]],
    phone: [null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],
  }, { validators: this.passwordMatchValidator });




  // registerForm: FormGroup = new FormGroup({
  //   name: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
  //   email: new FormControl(null, [Validators.required, Validators.email]),
  //   password: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
  //   rePassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
  //   phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
  // },
  //   this.passwordMatchValidator
  // );

  passwordMatchValidator(form: AbstractControl) {
    if (form.get('password')?.value === form.get('rePassword')?.value) {
      return null;
    } else {
      return { mismatch: true };
    }
  }

  register(): void {
    this.loader = true;
    this._AuthService.handelRegister(this.registerForm.value).subscribe({
      next: (data) => {
        this.loader = false;
        if (data.message == 'success') {
          this.mgSuccess = true;
          setTimeout(() => {
            this.routes.navigate(['/login'])
          }, 3000)
        }
      },
      error: (err) => {
        this.loader = false;

        this.errorMessage = err.error.message;
      }
    })
  }
}
