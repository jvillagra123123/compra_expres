import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListAdminPage } from './list-admin.page';

describe('ListAdminPage', () => {
  let component: ListAdminPage;
  let fixture: ComponentFixture<ListAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
