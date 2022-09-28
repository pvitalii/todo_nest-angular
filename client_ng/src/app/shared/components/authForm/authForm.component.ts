import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { AuthService } from "src/app/core/services/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-authForm',
    templateUrl: './authForm.component.html',
    styleUrls: ['./authForm.component.scss'],
    providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})

export class AuthForm implements OnInit {
    authType: string
    authForm: FormGroup

    constructor(private location: Location, private formBuilder: FormBuilder, private authService: AuthService, private router: Router) { }

    submit() {
        // Object.keys(this.authForm.controls).forEach(key => {
        //     console.log(this.authForm.get(key)?.errors);
        // });
        if (this.authType === 'login') {
            this.authService.login(this.authForm.value).subscribe(() => { this.router.navigate(['admin']) })
        } else {
            this.authService.registration(this.authForm.value).subscribe(() => { this.router.navigate(['/']) })
        }
    }

    ngOnInit(): void {
        this.authType = this.location.path().slice(6)
        this.authForm = this.formBuilder.group({
            username: [null,
                [
                    Validators.required,
                ]

            ],
            password: [null,
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(16),
                ]
            ]
        });
    }

}
