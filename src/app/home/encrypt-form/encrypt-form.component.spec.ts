import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncryptFormComponent } from './encrypt-form.component';

describe('EncryptFormComponent', () => {
  let component: EncryptFormComponent;
  let fixture: ComponentFixture<EncryptFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncryptFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncryptFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
