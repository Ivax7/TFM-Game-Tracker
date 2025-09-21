import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html'
})
export class UserProfileComponent implements OnInit {
  username: string = '';
  displayName: string = '';
  bio: string = '';
  avatarUrl: string = '';
  activeInfo: 'ratings' | 'reviews' = 'ratings';

  constructor(private userService: UserService, private authService: AuthService) {}

  ngOnInit() {
    const currentUser = this.authService.getCurrentUser();
    if(!currentUser) return;
    
    this.userService.getUser(currentUser.id).subscribe(user => {
      this.username = user.name || 'Unnamed User';
      this.displayName = user.displayName || '';
      this.bio = user.bio || '';
      this.avatarUrl = user.avatarUrl || 'assets/images/profile-pic.jpg'; // 🔑 aquí asignamos la URL real o la por defecto
    });
  }
}
