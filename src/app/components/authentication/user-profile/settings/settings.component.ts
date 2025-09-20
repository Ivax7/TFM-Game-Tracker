import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  form: FormGroup;
  userId = 1; // 👈 aquí pon el id real del usuario logueado

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.form = this.fb.group({
      displayName: [''],
      bio: [''],
    });
  }

  ngOnInit() {
    this.userService.getUser(this.userId).subscribe(user => {
      this.form.patchValue({
        displayName: user.displayName || '',
        bio: user.bio || '',
      });
    });
  }

  onSave() {
    if (this.form.valid) {
      this.userService.updateUser(this.userId, this.form.value).subscribe({
        next: (updatedUser) => {
          alert('Profile updated!');
          localStorage.setItem('user', JSON.stringify(updatedUser)); // 👈 sincroniza AuthService
        },
        error: err => console.error(err),
      });
    }
  }

}
