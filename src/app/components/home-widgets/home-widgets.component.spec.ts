import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeWidgetsComponent } from './home-widgets.component';

describe('HomeWidgetsComponent', () => {
  let component: HomeWidgetsComponent;
  let fixture: ComponentFixture<HomeWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeWidgetsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeWidgetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
