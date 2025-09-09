import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Difficulty, DIFFICULTY_LABEL } from '../../models/difficulty';

@Component({
  selector: 'app-cpu-setup',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cpu-setup.component.html',
  styleUrls: ['./cpu-setup.component.scss'],
})
export class CpuSetupComponent {
  levels: Difficulty[] = ['easy', 'medium', 'hard', 'extreme'];
  label = DIFFICULTY_LABEL;
  playerName = '';

  constructor(private router: Router) {}

  select(level: Difficulty) {
    if (!this.playerName.trim()) return;
    this.router.navigate(['game/cpu'], { queryParams: { level, name: this.playerName } });
  }
}
