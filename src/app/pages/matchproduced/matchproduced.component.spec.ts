import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchproducedComponent } from './matchproduced.component';

describe('MatchproducedComponent', () => {
  let component: MatchproducedComponent;
  let fixture: ComponentFixture<MatchproducedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchproducedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchproducedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
