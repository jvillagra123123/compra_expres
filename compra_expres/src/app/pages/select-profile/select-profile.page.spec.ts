import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectProfilePage } from './select-profile.page';

describe('SelectProfilePage', () => {
  let component: SelectProfilePage;
  let fixture: ComponentFixture<SelectProfilePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
