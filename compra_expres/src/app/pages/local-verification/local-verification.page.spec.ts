import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LocalVerificationPage } from './local-verification.page';

describe('LocalVerificationPage', () => {
  let component: LocalVerificationPage;
  let fixture: ComponentFixture<LocalVerificationPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
