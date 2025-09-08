import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuSetupComponent } from './cpu-setup.component';

describe('CpuSetupComponent', () => {
  let component: CpuSetupComponent;
  let fixture: ComponentFixture<CpuSetupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuSetupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuSetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
