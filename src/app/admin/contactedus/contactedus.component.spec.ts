import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactedusComponent } from './contactedus.component';

describe('ContactedusComponent', () => {
  let component: ContactedusComponent;
  let fixture: ComponentFixture<ContactedusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactedusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactedusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
