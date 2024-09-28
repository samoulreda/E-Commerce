import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, OnInit, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService implements OnInit {

  constructor(private _TranslateService: TranslateService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) { }
  ngOnInit(): void {
    this._TranslateService.setDefaultLang('en');
    if (isPlatformBrowser(this.platformId)) {
      this.setlang()
    }
  }
  setlang() {
    const language: string = localStorage.getItem('lang')!;
    this._TranslateService.use(language);
    if (language === 'en') {
      document.body.dir = 'ltr';
    } else if (language === 'ar') {
      document.body.dir = 'rtl';
    }
  }

  chingeLang(lang:string){
    localStorage.setItem('lang',lang);
    this.setlang()
  }
}
