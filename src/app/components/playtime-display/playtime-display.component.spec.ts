import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytimeDisplayComponent } from './playtime-display.component';

describe('PlaytimeDisplayComponent', () => {
  let component: PlaytimeDisplayComponent;
  let fixture: ComponentFixture<PlaytimeDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PlaytimeDisplayComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PlaytimeDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
