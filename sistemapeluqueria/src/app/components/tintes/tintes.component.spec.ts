import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TintesComponent } from './tintes.component';

describe('TintesComponent', () => {
  let component: TintesComponent;
  let fixture: ComponentFixture<TintesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TintesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TintesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
