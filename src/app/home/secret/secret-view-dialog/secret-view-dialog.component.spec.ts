import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretViewDialogComponent } from './secret-view-dialog.component';

describe('SecretViewDialogComponent', () => {
  let component: SecretViewDialogComponent;
  let fixture: ComponentFixture<SecretViewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretViewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretViewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
