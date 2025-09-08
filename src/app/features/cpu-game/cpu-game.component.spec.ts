import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuGameComponent } from './cpu-game.component';

describe('CpuGameComponent', () => {
  let component: CpuGameComponent;
  let fixture: ComponentFixture<CpuGameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpuGameComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpuGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
