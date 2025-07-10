import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent {
  activeTab: 'wishlist' | 'played' | 'lists' = 'wishlist';
  username: string = '';

  constructor(private auth: AuthService) {
    const user = this.auth.getCurrentUser();
    this.username = user?.name || user?.email || 'Usuario';
  }
}

