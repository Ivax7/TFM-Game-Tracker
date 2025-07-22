import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCardBodyComponent } from './game-card-body.component';

describe('GameCardBodyComponent', () => {
  let component: GameCardBodyComponent;
  let fixture: ComponentFixture<GameCardBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GameCardBodyComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GameCardBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
