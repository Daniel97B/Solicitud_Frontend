import { Inject } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs';
import { StorageService } from '../app/Localstorage/localstorage';
import { Router } from '@angular/router';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private localStorage: StorageService
    ) { }

    //*Intercepta peticiones HTTP(POST, GET, PUT, DELETE)
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //*En caso de retornto erroneo se ejecuta el siguiente bloque de código
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                //*Si el error es 401, se limpia el localstorage y se redirige al login
                if (error.status === 401) {
                    this.localStorage.clear();
                    console.log('token invalido, o expirado');
                    this.router.navigate(['login']);

                    return EMPTY;
                };
                throw error;
            }
            )
        );
    }
}
