import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentanaEmergenteComponent } from './ventana-emergente.component';

describe('VentanaEmergenteComponent', () => {
  let component: VentanaEmergenteComponent;
  let fixture: ComponentFixture<VentanaEmergenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VentanaEmergenteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentanaEmergenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
