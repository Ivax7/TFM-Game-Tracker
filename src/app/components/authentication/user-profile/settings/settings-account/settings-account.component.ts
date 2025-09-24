import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrl: './settings-account.component.css'
})
export class SettingsAccountComponent implements OnInit {
  user: any;
  showUsernameModal: boolean = false;
  newUsername: string = '';

  showDeleteModal: boolean = false;

  constructor(
    private auth: AuthService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.newUsername = this.user?.name || '';
  }

  // Update username
  uploadUserNameModal() {
    if(!this.newUsername || this.newUsername.trim() === '') {
      alert('User name cannot be empty.')
      return;
    }

    this.userService.updateUser(this.user.id, { name: this.newUsername}).subscribe({
      next: (updatedUser) => {
        this.auth.updateCurrentUser(updatedUser);
        this.user = updatedUser;
        this.showUsernameModal = false;
        alert('Username updated correctly')
      },
      error: (err) => {
        if(err.status === 409) {
          alert('This name is already taken');
        } else {
          console.error('Error updating username');
          alert('Error updating username')
        }
      }
    })
  }

  // Delete account
  confirmDeleteAccount() {
    if(!this.user?.id) {
      console.error("User not found");
      return;
    }

    this.userService.deleteUser(this.user.id).subscribe({
      next: () => {
        this.auth.logout();
        alert('Your account has been deleted successfully');
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log("Error deleting account:", err);
        alert('There was a problem deleting your account, please try again.')
      }
    });

    this.showDeleteModal = false;

  }



}
