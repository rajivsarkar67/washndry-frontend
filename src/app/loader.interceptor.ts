import { inject } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandlerFn,
  HttpEvent
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';
import { DataService } from './data.service';

export const loaderInterceptor: HttpInterceptorFn = (
  req: HttpRequest<any>,
  next: HttpHandlerFn
): Observable<HttpEvent<any>> => {
  const dataService = inject(DataService);
  dataService.loaderState.set(true);

  return next(req).pipe(
    finalize(() => dataService.loaderState.set(false))
  );
};
