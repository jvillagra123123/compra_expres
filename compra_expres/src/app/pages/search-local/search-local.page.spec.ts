import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SearchLocalPage } from './search-local.page';

describe('SearchLocalPage', () => {
  let component: SearchLocalPage;
  let fixture: ComponentFixture<SearchLocalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchLocalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
