import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { LogInCredentials } from '../Models/log-in-credentials.model';

import { map, tap } from 'rxjs/operators';
interface LoginResponse {
    rs: { token: string };
  }
@Injectable({ providedIn: 'root' })
export class AuthService {

    constructor(private http: HttpClient) { }

    public login(lang: string, credentials: LogInCredentials): Observable<LoginResponse> {
        const params = { lang: lang, ...credentials };
        return this.http
            .post<LoginResponse>(`${environment.BASE_URL}/${environment.LOGIN_ENDPOINT}`, params)
            .pipe(tap((result) => localStorage.setItem("token", result.rs.token) ));
    }
}