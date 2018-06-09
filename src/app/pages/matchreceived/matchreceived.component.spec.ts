import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchreceivedComponent } from './matchreceived.component';

describe('MatchreceivedComponent', () => {
  let component: MatchreceivedComponent;
  let fixture: ComponentFixture<MatchreceivedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchreceivedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchreceivedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
