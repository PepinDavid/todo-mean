import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BertComponent } from './bert.component';

describe('BertComponent', () => {
  let component: BertComponent;
  let fixture: ComponentFixture<BertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
