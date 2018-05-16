import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimplelistactComponent } from './simplelistact.component';

describe('SimplelistactComponent', () => {
  let component: SimplelistactComponent;
  let fixture: ComponentFixture<SimplelistactComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimplelistactComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimplelistactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
