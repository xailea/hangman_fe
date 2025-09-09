import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Difficulty, DIFFICULTY_LABEL } from '../../models/difficulty';
import { CommonModule } from '@angular/common';
import { WordService } from '../../core/services/word.service';

@Component({
  standalone: true,
  selector: 'app-cpu-setup',
  imports: [CommonModule],
  templateUrl: './cpu-setup.component.html',
  styleUrls: ['./cpu-setup.component.scss'],
})
export class CpuSetupComponent {
  levels: Difficulty[] = ['easy', 'medium', 'hard', 'extreme'];
  label = DIFFICULTY_LABEL;
  playerName = 'Player';

  constructor(private router: Router, private route: ActivatedRoute, private words: WordService) {
    this.route.queryParamMap.subscribe(p => {
      this.playerName = p.get('name') ?? 'Player';
    });
  }

  async select(level: Difficulty) {
    // prefetch non bloccante
    this.words.prefetch(level, 48).catch(() => {});
    this.router.navigate(['/game/cpu'], { queryParams: { level, name: this.playerName } });
  }
}
