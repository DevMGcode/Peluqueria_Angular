import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarradenavegacionComponent } from './barradenavegacion.component';

describe('BarradenavegacionComponent', () => {
  let component: BarradenavegacionComponent;
  let fixture: ComponentFixture<BarradenavegacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BarradenavegacionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarradenavegacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
