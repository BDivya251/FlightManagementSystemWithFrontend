import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
// export const authInterceptor: HttpInterceptorFn = (req, next) => {

//   const token = localStorage.getItem('auth-token');

//   // if token exists, clone request and add Authorization header
//   if (token) {
//     const authReq = req.clone({
//       setHeaders: {
//         Authorization: `Bearer ${token}`
//       }
//     });

//     return next(authReq);
//   }

//   // else send request as-is
//   return next(req);
// };
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);

  let token: string | null = null;

  //  run ONLY in browser
  if (isPlatformBrowser(platformId)) {
    token = localStorage.getItem('auth-token');
  }

  if (token) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(req);
};
