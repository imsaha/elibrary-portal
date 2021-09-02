import { Component, OnInit } from '@angular/core';
import { AuthService, ActingRole } from './auth/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'elibrary-portal';
    actingRole: ActingRole;

    constructor(private authService: AuthService, private router: Router) {}

    async ngOnInit() {
        this.actingRole = await this.authService.getUserActingRole();
    }

    async switchRole(role: ActingRole) {
        await this.authService.switchRole(role);
        switch (role) {
            case 'admin':
                this.router.navigate(['/admin']);
                break;
            case 'user':
                this.router.navigate(['/user']);
                break;
            case undefined:
                this.router.navigate(['/access-denied']);
                break;
        }
    }
}
