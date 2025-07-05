import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  name = '';

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    this.auth.register({ email: this.email, password: this.password, name: this.name }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.message || 'Registration failed')
    });
  }
}