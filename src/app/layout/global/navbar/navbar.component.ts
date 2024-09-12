import { login } from '../../../project/interfaces/login';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../..//project/services/auth.service';
import { Router } from '@angular/router';
import { TranslationService } from '../../../project/services/translation.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive,TranslateModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(
    private _AuthService: AuthService,
    private router: Router,
    private _TranslateService: TranslateService,
    private _TranslationService:TranslationService
  ) { }
  ngOnInit(): void {
    this._AuthService.user.subscribe((res: any) => {
      if (res?.id) {
        this.isLogin = true;
      } else {
        this.isLogin = false;
      }

    })
  }
  logout() {
    localStorage.removeItem('userToken');
    this._AuthService.user.next(null);
    this.router.navigate(['/login']);
  }
  chingeLang(lang: string) {
    this._TranslationService.chingeLang(lang)
  }
}
