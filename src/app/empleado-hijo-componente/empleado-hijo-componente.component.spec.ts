import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoHijoComponenteComponent } from './empleado-hijo-componente.component';

describe('EmpleadoHijoComponenteComponent', () => {
  let component: EmpleadoHijoComponenteComponent;
  let fixture: ComponentFixture<EmpleadoHijoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmpleadoHijoComponenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpleadoHijoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
