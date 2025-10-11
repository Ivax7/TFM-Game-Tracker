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
  currentUser: any;
  followersCount: number = 0;
  followingCount: number = 0;
  isFollowing: boolean = false;
  activeInfo: 'ratings' | 'reviews' = 'ratings';


  constructor(
    private userService: UserService,
    public authService: AuthService,
    private followService: FollowService,
  ) {}

  ngOnInit(): void {
    if(!this.profileUserId) {
      const authUser = this.authService.getCurrentUser();
      if(authUser?.id) {
        this.profileUserId = authUser.id;
      } else {
        console.log('No user autenticated')
        return
      }
    }

    this.loadUserProfile(this.profileUserId);
    this.loadFollowInfo(this.profileUserId);
    
  }

  private loadUserProfile(userId: number): void {
    this.userService.getUser(userId).subscribe({
      next: (user) => {
        this.currentUser = {
          ...user,
          avatarUrl: user.avatarUrl || 'assets/images/profile-pic.jpg',
          displayName: user.displayName || user.name || ''
        };
      },
      error: (err) => console.error('Error loading profile:', err)
    });
  }

  private loadFollowInfo(userId: number): void {
    // Follow counts
    this.followService.getFollowersCount(userId).subscribe(count => this.followersCount = count);
    this.followService.getFollowingCount(userId).subscribe(count => this.followingCount = count);
  
    const loggedInId = this.authService.getCurrentUser()?.id;
    if(!loggedInId || loggedInId === userId) return;

    this.followService.isFollowing(loggedInId, userId).subscribe((isFollowing: boolean) => (this.isFollowing = isFollowing))
  }

  toggleFollow() {
    const loggedInId = this.authService.getCurrentUser()?.id;
    if(!loggedInId) {
      alert('You must be logged in to follow users');
      return;
    }

    const action$ = this.isFollowing
      ? this.followService.unfollow(loggedInId, this.profileUserId)
      : this.followService.follow(loggedInId, this.profileUserId);

    action$.subscribe({
      next: () => {
        this.isFollowing = !this.isFollowing;
        this.followersCount += this.isFollowing ? 1 : -1;
      },
      error: (err) => console.log('Error toggling follow: ', err)
    })
  }
}
