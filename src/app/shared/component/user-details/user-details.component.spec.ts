import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../service/snackbar.service';

import { UserDetailsComponent } from './user-details.component';

describe('UserDetailsComponent', () => {
  let component: UserDetailsComponent;
  let fixture: ComponentFixture<UserDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserDetailsComponent ],
      providers: [
        { provide: UserService, useValue: { fetchuserbyId: () => of({ name: 'Test', skills: [], currentAddress: {}, permanentAddress: {} }), RemoveUser: () => of({}), removeUser: jasmine.createSpy('removeUser') } },
        { provide: SnackbarService, useValue: { opensnackbar: jasmine.createSpy('opensnackbar') } },
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ id: 'id' })) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(false) }) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
