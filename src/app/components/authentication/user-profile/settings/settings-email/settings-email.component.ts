import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-settings-email',
  templateUrl: './settings-email.component.html',
  styleUrl: './settings-email.component.css'
})
export class SettingsEmailComponent implements OnInit {
  user: any;
  showEmailModal: boolean = false;
  newEmail: string = '';

  constructor(
    private auth: AuthService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.newEmail = ''
  }

  // Update email
  uploadUserEmailModal() {
    if(!this.newEmail || this.newEmail.trim() === '') {
      alert('Email cannot be empty.')
      return;
    }

    this.userService.updateUser(this.user.id, { email: this.newEmail}).subscribe({
      next: (updatedUser) => {
        this.auth.updateCurrentUser(updatedUser);
        this.user = updatedUser;
        this.showEmailModal = false;
        alert('Email updated correctly')
      },
      error: (err) => {
        if(err.status === 409) {
          alert('This email is already taken');
        } else {
          console.error('Error updating email');
          alert('Error updating email')
        }
      }
    })
  }
}
