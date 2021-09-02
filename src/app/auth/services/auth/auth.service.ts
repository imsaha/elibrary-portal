import { Injectable } from '@angular/core';
import { firstValueFrom, map } from 'rxjs';
import { ILoginCommand } from '../../models/login.model';
import { HttpClient } from '@angular/common/http';
import { IResult } from 'src/app/shared/models';
import { environment } from 'src/environments/environment';
import jwt_decode from 'jwt-decode';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private http: HttpClient) {}

    async getUserRoles(): Promise<string[]> {
        const token = await this.getToken();
        if (token == null) {
            return [];
        }

        var decoded = jwt_decode<{ role: string[] }>(token.token);
        return decoded.role;
    }

    async getUserActingRole(): Promise<ActingRole> {
        const token = await this.getToken();
        if (token == null) {
            return undefined;
        }

        var decoded = jwt_decode<{ actingRole: ActingRole }>(token.token);
        return decoded.actingRole;
    }

    getToken(): Promise<IAuthToken | null> {
        const token = localStorage.getItem('token');
        if (!token) {
            return Promise.resolve(null);
        }

        const parsed = JSON.parse(token);
        const isExpired = new Date(parsed.expiry).getTime() < new Date().getTime();
        if (isExpired) {
            return Promise.resolve(null);
        }

        return Promise.resolve<IAuthToken>(parsed);
    }

    async login(param: ILoginCommand): Promise<boolean> {
        const token = await firstValueFrom(
            this.http
                .post<IResult<IAuthToken>>(`${environment.apiBase}/Users/Token`, param)
                .pipe(map((r) => r.data))
        );

        if (!token) {
            throw new Error('Invalid token');
        }

        localStorage.setItem('token', JSON.stringify(token));
        return true;
    }

    async switchRole(role: ActingRole): Promise<boolean> {
        const token = await firstValueFrom(
            this.http
                .get<IResult<IAuthToken>>(`${environment.apiBase}/Users/SwitchRole?role=${role}`)
                .pipe(map((r) => r.data))
        );

        if (!token) {
            throw new Error('Invalid token');
        }

        localStorage.setItem('token', JSON.stringify(token));
        return true;
    }
}

export interface IAuthToken {
    token: string;
    expiry: Date;
}

export type ActingRole = 'admin' | 'user' | undefined;
