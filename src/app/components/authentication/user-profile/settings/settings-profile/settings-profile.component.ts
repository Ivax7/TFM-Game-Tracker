import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '../../../../../services/user.service';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-settings-profile',
  templateUrl: './settings-profile.component.html',
  styleUrl: './settings-profile.component.css'
})
export class SettingsProfileComponent implements OnInit{
  form: FormGroup;
  userId!: number;
  avatarUrl: string = '';

  // CROP IMAGE STATUS
  showCropper: boolean = false;
  imageChangedEvent: any = '';
  croppedImage: Blob | null = null;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private auth: AuthService
  ) {
    this.form = this.fb.group({
      displayName: [''],
      bio: [''],
    });
  }

  ngOnInit(): void {
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

  adjustTextareaHeight(event: Event) {
    const textarea = event.target as HTMLTextAreaElement;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`
  }


  // CHANGE AVATAR

  // capture image + open cropper
  onAvatarChange(event: any) {
    this.imageChangedEvent = event;
    this.showCropper = true; // open modal
  }

  // save image base64 (square format)
  imageCropped(event: any) {
    console.log("📸 Evento del cropper:", event);
    this.croppedImage = event.blob;
  }

  uploadCroppedImage() {
    if (!this.croppedImage) {
      console.error("❌ No hay imagen recortada lista.");
      return;
    }
  
    const formData = new FormData();
    formData.append('avatar', this.croppedImage, 'avatar.png'); // 🔑 blob directo
  
    this.userService.uploadAvatar(this.userId, formData).subscribe(updatedUser => {
      this.avatarUrl = updatedUser.avatarUrl;
      this.auth.updateCurrentUser(updatedUser);
      this.showCropper = false; // close modal
    });
  }



}
