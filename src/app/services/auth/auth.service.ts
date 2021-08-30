import { Injectable } from '@angular/core';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Exception } from 'src/app/models/exceptions';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
@Injectable({
    providedIn: 'root',
})
export class AuthService {
    constructor(private firebaseAuth: AngularFireAuth) {}

    getAuthState(): Observable<firebase.User | null> {
        return this.firebaseAuth.authState;
    }

    signup(param: EmailAndPassword): Promise<boolean> {
        return from(this.firebaseAuth.createUserWithEmailAndPassword(param.email, param.password))
            .pipe(
                map((x) => x != null && !x.user?.isAnonymous),
                catchError(this.handleError)
            )
            .toPromise();
    }

    login(param: EmailAndPassword): Promise<boolean> {
        return from(this.firebaseAuth.signInWithEmailAndPassword(param.email, param.password))
            .pipe(
                map((x) => x != null && !x.user?.isAnonymous),
                catchError(this.handleError)
            )
            .toPromise();
    }

    handleError(error: any): Observable<never> {
        return throwError(new Exception(error?.message ?? 'Something is wrong.'));
    }

    logout(): Promise<void> {
        return this.firebaseAuth.signOut();
    }
}

type EmailAndPassword = {
    email: string;
    password: string;
};
