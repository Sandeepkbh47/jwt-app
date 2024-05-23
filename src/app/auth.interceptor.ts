import { isPlatformBrowser } from '@angular/common';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Inject, InjectionToken, PLATFORM_ID } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  let idToken;
  let platformid = inject(PLATFORM_ID);
  if (isPlatformBrowser(platformid)) {
    idToken = localStorage.getItem('id_token');
  }
  if (idToken) {
    const cloned = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + idToken),
    });

    return next(cloned);
  } else {
    return next(req).pipe(
      catchError((err: any) => {
        if (err instanceof HttpErrorResponse) {
          // Handle HTTP errors
          if (err.status === 401) {
            // Specific handling for unauthorized errors
            console.error('Unauthorized request:', err);
            // You might trigger a re-authentication flow or redirect the user here
          } else {
            // Handle other HTTP error codes
            console.error('HTTP error:', err);
          }
        } else {
          // Handle non-HTTP errors
          console.error('An error occurred:', err);
        }
        // Re-throw the error to propagate it further
        return throwError(() => err);
      })
    );
  }
};
