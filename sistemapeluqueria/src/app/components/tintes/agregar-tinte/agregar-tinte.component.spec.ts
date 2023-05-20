import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarTinteComponent } from './agregar-tinte.component';

describe('AgregarTinteComponent', () => {
  let component: AgregarTinteComponent;
  let fixture: ComponentFixture<AgregarTinteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarTinteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarTinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
