import { Component } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  form: FormGroup;
  userId!: number;
  avatarUrl: string = '';

  constructor(private fb: FormBuilder, private userService: UserService, private auth: AuthService) {
    this.form = this.fb.group({
      displayName: [''],
      bio: [''],
    });
  }

  ngOnInit() {
    const currentUser = this.auth.getCurrentUser();
    if (!currentUser) return;

    this.userId = currentUser.id;
    this.avatarUrl = currentUser.avatarUrl || 'assets/images/profile-pic.jpg';

    this.userService.getUser(this.userId).subscribe(user => {
      this.form.patchValue({
        displayName: user.displayName || '',
        bio: user.bio || ''
      });
      this.avatarUrl = user.avatarUrl || this.avatarUrl;
    });
  }

  onSave() {
    if (this.form.valid) {
      this.userService.updateUser(this.userId, this.form.value).subscribe(updatedUser => {
        this.auth.updateCurrentUser(updatedUser);
        alert('Profile updated!');
      });
    }
  }

  onAvatarChange(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('avatar', file);

    this.userService.uploadAvatar(this.userId, formData).subscribe(updatedUser => {
      this.avatarUrl = updatedUser.avatarUrl;
      this.auth.updateCurrentUser(updatedUser); // 🔑 actualizar estado global
    });
  }
}
