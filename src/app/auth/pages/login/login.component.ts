import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Exception } from 'src/app/shared/models/exceptions';
import { TitleService } from 'src/app/shared/services/title/title.service';
import { AuthService } from '../../services/auth/auth.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    loginForm: FormGroup;
    passwordAsClearText = false;
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
            userId: ['', [Validators.required]],
            password: ['', [Validators.required]],
        });
    }

    ngOnInit(): void {}

    async login(): Promise<void> {
        const result = await this.authService.login(this.loginForm.value);
        if (result == null || result === false) {
            throw { message: 'Invalid login try.' };
        }

        const returnUrl = this.activatedRoute.snapshot.queryParams.ret;
        this.router.navigate([returnUrl ?? '/admin']);
    }
}
