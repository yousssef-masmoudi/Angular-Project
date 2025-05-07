import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeFromComponent } from './home-from.component';

describe('HomeFromComponent', () => {
  let component: HomeFromComponent;
  let fixture: ComponentFixture<HomeFromComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFromComponent]
    });
    fixture = TestBed.createComponent(HomeFromComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
