import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteristicasEmpleadoComponenteComponent } from './caracteristicas-empleado-componente.component';

describe('CaracteristicasEmpleadoComponenteComponent', () => {
  let component: CaracteristicasEmpleadoComponenteComponent;
  let fixture: ComponentFixture<CaracteristicasEmpleadoComponenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CaracteristicasEmpleadoComponenteComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CaracteristicasEmpleadoComponenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
