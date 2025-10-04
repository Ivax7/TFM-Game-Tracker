import { Component, OnInit } from '@angular/core';
import { SuggestionService } from '../../../services/suggestion.service';
import { AuthService } from '../../authentication/auth.service';
import { Suggestion } from '../../../models/suggestion.model';

@Component({
  selector: 'app-suggestions',
  templateUrl: './suggestions.component.html',
  styleUrl: './suggestions.component.css'
})
export class SuggestionsComponent implements OnInit {
  showSuggestionModal: boolean = false;
  title = '';
  suggestionText: string = '';
  suggestions: Suggestion[] = [];

  
  constructor(
    private suggestionService: SuggestionService,
    public auth: AuthService
  ){}

    ngOnInit(): void {
    this.loadSuggestions();
  }

  loadSuggestions() {
    this.suggestionService.getSuggestions().subscribe({
      next: (data) => {
        this.suggestions = data;
      },
      error: (err) => {
        console.log('Error loading suggestions:', err);
      }
    });
  }


  uploadSuggestionModal() {
    if(!this.title.trim() || !this.suggestionText.trim()) {
      alert('Suggestion cannot be empty.')
      return;
    }

    const user = this.auth.getCurrentUser();
    if(!user) {
      alert('You must be logged in to send suggestions.');
      return;
    }

    const newSuggestion: Suggestion = {
      title: this.title,
      suggestion: this.suggestionText,
      userId: user.id,
      userName: user.name,
      date: new Date(),
    };

    this.suggestionService.createSuggestion(newSuggestion).subscribe({
      next: () => {
        alert('Suggestion submited successfully!');
        this.showSuggestionModal = false;
        this.title = '';
        this.suggestionText = '';

        this.loadSuggestions()
      },

      error: (err) => {
        console.log(err);
        alert('Something went wrong, please try again.')
      }
    })
  }
}