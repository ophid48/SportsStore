import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportStoreComponent } from './sport-store.component';

describe('SportStoreComponent', () => {
  let component: SportStoreComponent;
  let fixture: ComponentFixture<SportStoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportStoreComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
