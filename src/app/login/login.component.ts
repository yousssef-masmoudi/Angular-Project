import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/Services/AuthService (2)';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  async login() {
    try {
      // Calling the login method from AuthService and waiting for the promise to resolve
      await this.authService.login(this.username, this.password);

      // Redirect to the homepage or a protected route
      this.router.navigate(['/home']);
    } catch (error) {
      this.errorMessage = 'Invalid credentials or login failed. Please try again.';
      console.error('Login error: ', error);
    }
  }
}
