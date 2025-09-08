import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Difficulty, DIFFICULTY_LABEL } from '../../models/difficulty';

@Component({
  standalone: true,
  selector: 'app-cpu-setup',
  templateUrl: './cpu-setup.component.html',
  styleUrls: ['./cpu-setup.component.scss'],
})
export class CpuSetupComponent {
  levels: Difficulty[] = ['easy', 'medium', 'hard', 'extreme'];
  label = DIFFICULTY_LABEL;

  constructor(private router: Router) {}

  select(level: Difficulty) {
    this.router.navigate(['/game/cpu'], { queryParams: { level } });
  }
}
