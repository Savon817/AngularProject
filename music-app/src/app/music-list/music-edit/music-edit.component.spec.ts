import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicEditComponent } from './music-edit.component';

describe('MusicEditComponent', () => {
  let component: MusicEditComponent;
  let fixture: ComponentFixture<MusicEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MusicEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
