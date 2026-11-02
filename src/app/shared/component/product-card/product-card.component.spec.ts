import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { of } from 'rxjs';
import { ProductService } from '../../service/product.service';
import { SnackbarService } from '../../service/snackbar.service';

import { ProductCardComponent } from './product-card.component';

describe('ProductCardComponent', () => {
  let component: ProductCardComponent;
  let fixture: ComponentFixture<ProductCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductCardComponent ],
      providers: [
        { provide: ProductService, useValue: { RemoveProduct: () => of({}) } },
        { provide: SnackbarService, useValue: { opensnackbar: jasmine.createSpy('opensnackbar') } },
        { provide: ActivatedRoute, useValue: { queryParams: of({ product: JSON.stringify({ title: 'Test', id: 'id' }) }), snapshot: { params: { id: 'id' } } } },
        { provide: Router, useValue: { navigate: jasmine.createSpy('navigate') } },
        { provide: MatDialog, useValue: { open: () => ({ afterClosed: () => of(false) }) } }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
