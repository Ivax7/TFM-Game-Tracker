import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../auth.service';
import { UserGameService } from '../../../../services/user-game.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-collection-status',
  templateUrl: './collection-status.component.html',
  styleUrl: './collection-status.component.css'
})
export class CollectionStatusComponent implements OnInit, OnChanges {
  @Input() userId?: number; // Auth user or Visited User 

  games: any[] = [];
  activeTab: 'playing' | 'beaten' | 'completed' | 'abandoned' = 'playing';
  user: any;

  constructor(
    private auth: AuthService,
    private userGameService: UserGameService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.reloadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userId'] && !changes['userId'].firstChange) {
      console.log('[UserCollectionStatus] userId changed -> reloading games');
      this.reloadData();
    }
  }

  private reloadData():void {
    this.loadUser();
    this.loadGames();
  }

  private getCurrentUserId(): number | undefined {
    return this.userId ?? this.auth.getCurrentUser()?.id;
  }

  private loadUser(): void {
    const idToLoad = this.getCurrentUserId();
    if (!idToLoad) return;
  
    if (idToLoad === this.auth.getCurrentUser()?.id) {
      this.user = this.auth.getCurrentUser();
    } else {
      this.userService.getUser(idToLoad).subscribe(user => this.user = user);
    }
  }
  
  private loadGames(): void {
    const idToLoad = this.getCurrentUserId();
    if (!idToLoad) return;
  
    this.userGameService.getEnrichedGamesByUser(idToLoad)
      .subscribe(allGames => this.games = [...allGames].reverse());
  }
  
  onGameUpdated(): void {
    this.loadGames();
  }


}