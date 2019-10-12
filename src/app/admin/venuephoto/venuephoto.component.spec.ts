import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VenuephotoComponent } from './venuephoto.component';

describe('VenuephotoComponent', () => {
  let component: VenuephotoComponent;
  let fixture: ComponentFixture<VenuephotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VenuephotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VenuephotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
