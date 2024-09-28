import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs';

export const loodingInterceptor: HttpInterceptorFn = (req, next) => {
  const _NgxSpinnerService =inject(NgxSpinnerService)
  _NgxSpinnerService.show('spinner-1')

  return next(req).pipe(finalize(()=>{
    _NgxSpinnerService.hide('spinner-1')
  }));
};
