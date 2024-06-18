import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeuwuComponent } from './animeuwu.component';

describe('AnimeuwuComponent', () => {
  let component: AnimeuwuComponent;
  let fixture: ComponentFixture<AnimeuwuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AnimeuwuComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnimeuwuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
