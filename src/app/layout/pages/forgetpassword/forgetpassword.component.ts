import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../project//services/Auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrl: './forgetpassword.component.scss'
})
export class ForgetpasswordComponent {
  errorMessage !: string;
  finishedForm1: boolean = false;
  finishedForm2: boolean = false;
  loader: boolean = false;

  emailForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  },
  );
  codeForm: FormGroup = new FormGroup({
    resetCode: new FormControl(null, [Validators.required]),
  },
  );
  resetPasswordForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    newPassword: new FormControl(null, [Validators.required, Validators.pattern(/^[A-Z][A-Za-z0-9]{4}/)]),
  },
  );

  constructor(private _AuthService: AuthService, private routes: Router) { }

  sendEmail():void {

    const emailValue= this.emailForm.get('email')?.value;
    this.resetPasswordForm.get('email')?.patchValue(emailValue)
    this.loader = true;
    this._AuthService.forgetpassword(this.emailForm.value).subscribe({
      next: (data) => {
        this.loader = false;
        this.finishedForm1=true;
        // this.routes.navigate(['/login']);
      },
    })
  }

  verifyCode():void {
    this.loader = true;
    this._AuthService.verifyResetCode(this.codeForm.value).subscribe({
      next: (data) => {
        this.loader = false;
        this.finishedForm2=true;
        // this.routes.navigate(['/login']);
      },
    })
  }

  resetPassword():void {
    this.loader = true;
    this._AuthService.resetPassword(this.resetPasswordForm.value).subscribe({
      next: (data) => {
        localStorage.setItem('userToken',data.token);
        this._AuthService.getUser()
        this.loader = false;
        this.routes.navigate(['/home']);
      },
    })
  }
}
