import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exception } from 'src/app/models/exceptions';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TitleService } from 'src/app/services/title/title.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    loading = false;
    errorMessage = '';
    constructor(
        titleService: TitleService,
        fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        titleService.setTitle('Login');

        this.loginForm = fb.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    async login(): Promise<void> {
        try {
            this.loading = true;

            const result = await this.authService.login(this.loginForm.value);
            if (result == null || result === false) {
                throw { message: 'Invalid login try.' };
            }

            const returnUrl = this.activatedRoute.snapshot.queryParams.ret;
            this.router.navigate([returnUrl ?? '/welcome']);
        } catch (error) {
            console.log(error);
            if (error instanceof Exception) {
                this.errorMessage = error.message;
            }
        } finally {
            this.loading = false;
        }
    }
}
