import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-collection-status',
  templateUrl: './collection-status.component.html',
  styleUrl: './collection-status.component.css'
})
export class CollectionStatusComponent implements OnInit {
  user: any;

  activeTab: 'wishlist' | 'playing' | 'beaten' | 'completed' | 'abandoned' = 'playing';
  
  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.user = this.auth.getCurrentUser();
  }

}
