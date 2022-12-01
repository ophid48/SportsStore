import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SportAdminComponent } from './sport-admin.component';

describe('SportAdminComponent', () => {
  let component: SportAdminComponent;
  let fixture: ComponentFixture<SportAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SportAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SportAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
