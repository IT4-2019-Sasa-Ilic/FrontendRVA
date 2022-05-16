import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TipRacunaDialogComponent } from './tip-racuna-dialog.component';

describe('TipRacunaDialogComponent', () => {
  let component: TipRacunaDialogComponent;
  let fixture: ComponentFixture<TipRacunaDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TipRacunaDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TipRacunaDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
