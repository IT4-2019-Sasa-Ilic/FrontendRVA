import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacunDialogComponent } from './racun-dialog.component';

describe('RacunDialogComponent', () => {
  let component: RacunDialogComponent;
  let fixture: ComponentFixture<RacunDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacunDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacunDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
