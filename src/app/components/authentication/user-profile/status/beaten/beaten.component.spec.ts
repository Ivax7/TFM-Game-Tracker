import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatenComponent } from './beaten.component';

describe('BeatenComponent', () => {
  let component: BeatenComponent;
  let fixture: ComponentFixture<BeatenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BeatenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BeatenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
