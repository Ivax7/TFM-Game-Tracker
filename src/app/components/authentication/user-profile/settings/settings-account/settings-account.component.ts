import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../auth.service';
import { UserService } from '../../../../../services/user.service';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-settings-account',
  templateUrl: './settings-account.component.html',
  styleUrl: './settings-account.component.css'
})
export class SettingsAccountComponent implements OnInit {
  user: any;
  showUsernameModal: boolean = false;
  newUsername: string = '';


  constructor(private auth: AuthService, private userSevice: UserService) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
    this.newUsername = this.user?.name || '';
  }

  uploadUserNameModal() {
    if(!this.newUsername || this.newUsername.trim() === '') {
      alert('User name cannot be empty.')
      return;
    }

    this.userSevice.updateUser(this.user.id, { name: this.newUsername}).subscribe({
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

}
