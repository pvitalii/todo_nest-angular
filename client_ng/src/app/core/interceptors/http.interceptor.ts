import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, of } from "rxjs";
import { AuthService } from "../services/auth.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
    constructor(private router: Router, private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        req = req.clone({
            withCredentials: true,
        })

        return next.handle(req).pipe(catchError((err) => {
            this.authService.logout().subscribe(() => {
                alert("Token expired, login again please")
                this.router.navigate(['auth/login'])
            });
            throw err
        }))
    }
}

export const httpInterceptorProviders = [
    { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];