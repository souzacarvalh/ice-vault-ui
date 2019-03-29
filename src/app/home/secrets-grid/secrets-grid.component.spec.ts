import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretsGridComponent } from './secrets-grid.component';

describe('SecretsGridComponent', () => {
  let component: SecretsGridComponent;
  let fixture: ComponentFixture<SecretsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
