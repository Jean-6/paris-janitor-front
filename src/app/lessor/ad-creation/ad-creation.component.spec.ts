import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdCreationComponent } from './ad-creation.component';

describe('AdCreationComponent', () => {
  let component: AdCreationComponent;
  let fixture: ComponentFixture<AdCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdCreationComponent]
    });
    fixture = TestBed.createComponent(AdCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
