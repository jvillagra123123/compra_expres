import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GestionAdminPage } from './gestion-admin.page';

describe('GestionAdminPage', () => {
  let component: GestionAdminPage;
  let fixture: ComponentFixture<GestionAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GestionAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
