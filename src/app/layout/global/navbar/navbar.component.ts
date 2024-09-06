import { login } from '../../../project/interfaces/login';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../..//project/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
  isLogin: boolean = false;
  constructor(private _AuthService: AuthService, private router: Router) { }
  ngOnInit(): void {
    this._AuthService.user.subscribe((res:any) => {
      if (res?.id) {
        this.isLogin = true;
      }else{
        this.isLogin = false;
      }

    })
  }
  logout(){
    localStorage.removeItem('userToken');
    this._AuthService.user.next(null);
    this.router.navigate(['/login']);
  }
}
