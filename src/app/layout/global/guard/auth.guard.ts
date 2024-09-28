import { CanActivateFn, Router } from '@angular/router';
import { inject} from '@angular/core';
import { AuthService } from '../../../project/services/Auth/auth.service';

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
