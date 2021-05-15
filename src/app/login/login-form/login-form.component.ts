import { TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

import { NotificationService } from 'src/app/shared/services/notification.service';
@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
})
export class LoginFormComponent implements OnInit {
  form: FormGroup;
  returnUrl: string;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    public translate: TranslateService,
    private notifyService: NotificationService
  ) {}

  ngOnInit() {
    this.createForm();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    const formData = this.form.value;
    this.authenticationService
      .login(formData.username, formData.password)
      .subscribe(
        (data) => {
          if (data) {
            // login successful so redirect to return url
            this.notifyService.showSuccess(
              'You have been logged in successfully!',
              ''
            );

            this.router.navigateByUrl(this.returnUrl);
          } else {
            this.notifyService.showError('Error in Login! try again!', '');

            this.router.navigate(['/login']);
          }
        },
        (error) => {
          // login failed so display error
          this.notifyService.showError('Error in Login!', '');
        }
      );
  }

  showToasterSuccess() {
    this.notifyService.showSuccess(
      'Data shown successfully !!',
      'ItSolutionStuff.com'
    );
  }
  createForm() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(12),
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-zd$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }
}
