import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { GetConfirmComponent } from './get-confirm.component';

describe('GetConfirmComponent', () => {
  let component: GetConfirmComponent;
  let fixture: ComponentFixture<GetConfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetConfirmComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: 'Confirm?' }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetConfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
