import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../auth.service';
import { FollowService } from '../../../services/follow.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  @Input() profileUserId!: number;

  username: string = '';
  displayName: string = '';
  bio: string = '';
  avatarUrl: string = '';
  followersCount: number = 0;
  followingCount: number = 0;
  isFollowing: boolean = false;
  activeInfo: 'ratings' | 'reviews' = 'ratings';
  currentUser: any;


  constructor(
    private userService: UserService,
    public authService: AuthService,
    private followService: FollowService,
    private auth: AuthService
  ) {}

  ngOnInit() {
    this.loadUserProfile();
    this.loadFollowInfo();

    const currentUser = this.authService.getCurrentUser();
    if(!currentUser) return;
    
    this.auth.user$.subscribe(user => {
      this.currentUser = user;
    });
    
  }


  private loadUserProfile() {
    this.userService.getUser(this.profileUserId).subscribe(user => {
      this.username = user.name || 'Unnamed User';
      this.displayName = user.displayName || '';
      this.bio = user.bio || '';
      this.avatarUrl = user.avatarUrl || 'assets/images/profile-pic.jpg';
    });
  }

  private loadFollowInfo() {
    // Follow counts
    this.followService.getFollowersCount(this.profileUserId).subscribe(count => this.followersCount = count);
    this.followService.getFollowingCount(this.profileUserId).subscribe(count => this.followingCount = count);
  
    const currentUserId = this.authService.getCurrentUser()?.id;
    if(!currentUserId || currentUserId === this.profileUserId) return;

    this.followService.isFollowing(currentUserId, this.profileUserId).subscribe((following: boolean) => {
      this.isFollowing = following;
    });
  }

  toggleFollow() {
    const currentUserId = this.authService.getCurrentUser()?.id;
    if(!currentUserId) {
      alert('You must be logged in to follow users');
      return;
    }
    if(this.isFollowing) {
      this.followService.unfollow(currentUserId, this.profileUserId).subscribe({
        next: () => {
          this.isFollowing = false;
          this.followersCount--;
        },
        error: err => console.log(err)
      });
    } else {
      this.followService.follow(currentUserId, this.profileUserId).subscribe({
        next: () => {
          this.isFollowing = true;
          this.followersCount++;
        },
        error: err => console.log(err)
      })
    }
  }
}
