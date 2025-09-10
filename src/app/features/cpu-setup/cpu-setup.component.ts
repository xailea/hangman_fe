import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Difficulty, DIFFICULTY_LABEL } from '../../models/difficulty';
import { CommonModule } from '@angular/common';
import { WordService } from '../../core/services/word.service';
import {FormsModule} from "@angular/forms";

@Component({
  standalone: true,
  selector: 'app-cpu-setup',
    imports: [CommonModule, FormsModule],
  templateUrl: './cpu-setup.component.html',
  styleUrls: ['./cpu-setup.component.scss'],
})
export class CpuSetupComponent {
  levels: Difficulty[] = ['easy', 'medium', 'hard', 'extreme'];
  label = DIFFICULTY_LABEL;
  name = '';

  constructor(private router: Router, private route: ActivatedRoute, private words: WordService) {
    this.name = this.route.snapshot.queryParamMap.get('name') ?? '';
    this.route.queryParamMap.subscribe(p => this.name = p.get('name') ?? '');
  }

  async select(level: Difficulty) {
    this.words.prefetch(level, 48).catch(() => {});
    this.router.navigate(['/game/cpu'], { queryParams: { level, name: this.name } });
  }

  back(){ this.router.navigate(['']); }
}
