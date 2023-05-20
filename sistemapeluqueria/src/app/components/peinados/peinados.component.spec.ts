import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PeinadosComponent } from './peinados.component';

describe('PeinadosComponent', () => {
  let component: PeinadosComponent;
  let fixture: ComponentFixture<PeinadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PeinadosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PeinadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
