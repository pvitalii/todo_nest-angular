import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { catchError, throwError } from 'rxjs';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {}

  private static formatErrors(error: any) {
    return  throwError(error.error);
  }

  get(path: string, params: HttpParams = new HttpParams()) {
    return this.http.get(`${environment.api_url}${path}`, {params})
      .pipe(catchError(ApiService.formatErrors))
  }

  post(path:string, body: {}) {
    return this.http.post(`${environment.api_url}${path}`, body)
      .pipe(catchError(ApiService.formatErrors))
  }

  delete(path: string) {
    return this.http.delete(`${environment.api_url}${path}`)
      .pipe(catchError(ApiService.formatErrors))

  }

  put(path:string, body: {}) {
    return this.http.post(`${environment.api_url}${path}`, body)
      .pipe(catchError(ApiService.formatErrors))
  }
}

