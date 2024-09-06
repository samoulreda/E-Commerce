import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../..//project/services/auth.service';
import { inject} from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
let _AuthService:AuthService = inject(AuthService);
let router:Router = inject(Router)
  if(typeof localStorage !='undefined' && localStorage.getItem('userToken')!=null){
    _AuthService.getUser()
    return true;
  }else{
router.navigate(['/login'])
    return false;
  }
};
