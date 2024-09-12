import { HttpInterceptorFn } from '@angular/common/http';

export const headerInterceptor: HttpInterceptorFn = (req, next) => {
  req=req.clone({
    setHeaders:{
      token: localStorage.getItem('userToken') || '',
      language: localStorage.getItem('lang') || 'en',
    },
  })
  return next(req);
};
