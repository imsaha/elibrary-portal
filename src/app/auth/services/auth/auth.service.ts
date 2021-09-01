import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { ILoginCommand } from '../../models/login.model';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private firebaseAuth: AngularFireAuth) {}

    getAuthState(): Observable<firebase.User | null> {
        return this.firebaseAuth.authState;
    }

    async login(param: ILoginCommand): Promise<boolean> {
        const response = await this.firebaseAuth.signInWithEmailAndPassword(
            param.email,
            param.password
        );
        return response != null && response.user != null;
    }

    logout(): Promise<void> {
        return this.firebaseAuth.signOut();
    }
}
