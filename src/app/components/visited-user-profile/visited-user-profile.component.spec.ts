import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitedUserProfileComponent } from './visited-user-profile.component';

describe('VisitedUserProfileComponent', () => {
  let component: VisitedUserProfileComponent;
  let fixture: ComponentFixture<VisitedUserProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisitedUserProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VisitedUserProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
