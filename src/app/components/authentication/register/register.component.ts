import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      // añadir alguna otra validación de caracteres con Regex
      password: ['', [Validators.required, Validators.minLength(6)]],
      name: ['']
    });
  }

  register() {
    if (this.registerForm.invalid) return;

    const { email, password, name } = this.registerForm.value;

    this.auth.register({ email, password, name }).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err) => alert(err.error.message || 'Registration failed')
    });
  }

  // Opcional: getter para facilitar el acceso en HTML
  get f() {
    return this.registerForm.controls;
  }
}