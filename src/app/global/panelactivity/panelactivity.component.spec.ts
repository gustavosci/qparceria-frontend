import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelactivityComponent } from './panelactivity.component';

describe('PanelactivityComponent', () => {
  let component: PanelactivityComponent;
  let fixture: ComponentFixture<PanelactivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelactivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
