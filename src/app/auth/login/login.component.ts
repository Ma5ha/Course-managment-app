import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../core/auth.service';

type CustomResponse = {
  token: string;
}

@Component({
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.createForm();
  }

  login() {
    const { invalid, value: { password, username } } = this.loginForm;

    if (invalid) return;

    this.authService.login(username, password).subscribe(
      (response: CustomResponse) => {
        this.authService.saveUser(username, response.token);
        this.router.navigate(['/']);
      },
      (error) => console.error(error)
    )
  }

  private createForm() {
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

}
