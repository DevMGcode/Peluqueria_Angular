import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarTinteComponent } from './listar-tinte.component';

describe('ListarTinteComponent', () => {
  let component: ListarTinteComponent;
  let fixture: ComponentFixture<ListarTinteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarTinteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarTinteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
