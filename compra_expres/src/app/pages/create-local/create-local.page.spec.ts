import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateLocalPage } from './create-local.page';

describe('CreateLocalPage', () => {
  let component: CreateLocalPage;
  let fixture: ComponentFixture<CreateLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
