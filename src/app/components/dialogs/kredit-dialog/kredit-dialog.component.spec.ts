import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KreditDialogComponent } from './kredit-dialog.component';

describe('KreditDialogComponent', () => {
  let component: KreditDialogComponent;
  let fixture: ComponentFixture<KreditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KreditDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KreditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
