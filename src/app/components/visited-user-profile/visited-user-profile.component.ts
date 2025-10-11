import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../authentication/auth.service';
import { FollowService } from '../../services/follow.service';

@Component({
  selector: 'app-visited-user-profile',
  templateUrl: './visited-user-profile.component.html',
  styleUrl: './visited-user-profile.component.css'
})
export class VisitedUserProfileComponent implements OnInit {
  user: any;
  profileUserId!: number;

  isFollowing: boolean = false;
  followersCount: number = 0;
  followingCount: number = 0;

  games: any[] = [];

  activeView: 'wishlist' | 'collection' = 'wishlist';


  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public authService: AuthService,
    private followService: FollowService
  ){}

  ngOnInit(): void {
    // Escuchamos los cambios en los parámetros de la ruta
    this.route.paramMap.subscribe(params => {
      const userIdParam = params.get('id');
      if (userIdParam) {
        this.profileUserId  = Number(userIdParam);
        
        console.log('[VisitedUserProfile] Profile ID:', this.profileUserId);

        this.loadUserProfile(this.profileUserId);
        this.loadFollowInfo(this.profileUserId)
      } else {
        console.log('No se recibió un id de usuario en la ruta')
      }
    });
  }

  private loadUserProfile(userId: number): void {
    this.userService.getUser(userId).subscribe({
      next: data => {
        this.user = data;
      },
      error: (err) => {
        console.log('Error fetching user profile', err)
      }
    })
  }


  private loadFollowInfo(userId: number): void {
    // Cargar contadores
    this.followService.getFollowersCount(userId).subscribe(
      count => this.followersCount = count
    );

    this.followService.getFollowingCount(userId).subscribe(
      count => this.followingCount = count
    );

    // Verificar si el usuario actual ya sigue al visitado
    const currentUserId = this.authService.getCurrentUser()?.id;
    if (!currentUserId || currentUserId === userId) return;

    this.followService.isFollowing(currentUserId, userId).subscribe(
      (following: boolean) => this.isFollowing = following
    );
  }

  toggleFollow(): void {
    const currentUserId = this.authService.getCurrentUser()?.id;
    if (!currentUserId) {
      alert('You must be logged in to follow users');
      return;
    }

    console.log(`[Follow] currentUserId=${currentUserId}, profileUserId=${this.profileUserId}`); // 👈 DEBUG

    if (this.isFollowing) {
      this.followService.unfollow(currentUserId, this.profileUserId).subscribe({
        next: () => {
          this.isFollowing = false;
          this.followersCount--;
        },
        error: err => console.log('Error unfollowing user:', err)
      });
    } else {
      this.followService.follow(currentUserId, this.profileUserId).subscribe({
        next: () => {
          this.isFollowing = true;
          this.followersCount++;
        },
        error: err => console.log('Error following user:', err)
      });
    }
  }



}
  