import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetbalancePage } from './getbalance.page';

describe('GetbalancePage', () => {
  let component: GetbalancePage;
  let fixture: ComponentFixture<GetbalancePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(GetbalancePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
