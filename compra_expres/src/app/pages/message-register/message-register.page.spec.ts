import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessageRegisterPage } from './message-register.page';

describe('MessageRegisterPage', () => {
  let component: MessageRegisterPage;
  let fixture: ComponentFixture<MessageRegisterPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MessageRegisterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
