import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameActionButtonsComponent } from './game-action-buttons.component';

describe('GameActionButtonsComponent', () => {
  let component: GameActionButtonsComponent;
  let fixture: ComponentFixture<GameActionButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameActionButtonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
