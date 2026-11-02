import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { UserService } from '../../service/user.service';
import { SnackbarService } from '../../service/snackbar.service';

import { UsersDashComponent } from './users-dash.component';

describe('UsersDashComponent', () => {
  let component: UsersDashComponent;
  let fixture: ComponentFixture<UsersDashComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsersDashComponent ],
      providers: [
        { provide: UserService, useValue: { fetchusers: () => of([]), removeIdObs: of() } },
        { provide: SnackbarService, useValue: { opensnackbar: jasmine.createSpy('opensnackbar') } },
        { provide: ActivatedRoute, useValue: { queryParams: of({}) } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsersDashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
