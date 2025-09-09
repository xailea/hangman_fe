import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { GameService, StartResp, GuessResp } from '../../services/game.service';

@Component({
  selector: 'app-cpu-game',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './cpu-game.component.html',
  styleUrls: ['./cpu-game.component.scss']
})
export class CpuGameComponent implements OnInit {
  playerName = 'Player';
  level: 'easy'|'medium'|'hard'|'extreme' = 'easy';
  state: StartResp | null = null;

  current = '';
  guessed = new Set<string>();
  wrongLetters: string[] = [];
  lives = 0;
  maxLives = 6;
  gameOver: 'win'|'lose'|null = null;

  constructor(private route: ActivatedRoute, private router: Router, private api: GameService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.level = (p['level'] ?? 'easy') as any;
      this.playerName = (p['name'] ?? 'Player').toString();
      this.start();                         // seed random lato BE
    });
  }

  private start(seed?: string) {
    this.api.start(this.level, seed).subscribe(r => {
      this.state = r;
      this.lives = r.lives;
      this.maxLives = r.lives;
      this.wrongLetters = [];
      this.guessed.clear();
      this.current = '';
      this.gameOver = null;
    });
  }

  back(){ this.router.navigate(['/cpu']); }
  changeWord(){ this.start(Date.now().toString()); }   // ← forza seed diverso
  restart(){ this.changeWord(); }

  get dots(): number[] { return Array.from({ length: this.maxLives }); }
  get parts(): number { return this.maxLives - this.lives; }

  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value.toUpperCase();
    this.current = v.replace(/[^A-ZÀ-ÖØ-Ý]/g, '').slice(0, 1);
  }
  filter(ev: KeyboardEvent) {
    if (['Backspace','Tab','Enter'].includes(ev.key)) return;
    if (!/^[a-zA-ZÀ-öØ-ÿ]$/.test(ev.key)) ev.preventDefault();
  }

  submit() {
    if (!this.state || !this.current || this.gameOver) return;
    const letter = this.current.toUpperCase();
    if (this.guessed.has(letter)) { this.current = ''; return; }
    this.guessed.add(letter);

    this.api.guess(this.level, this.state.seed, this.state.masked, letter, this.lives)
      .subscribe((res: GuessResp) => {
        this.state = { ...this.state!, masked: res.masked, lives: res.lives,
          positions: res.positions, revealed: res.correct ? letter : this.state!.revealed };
        this.lives = res.lives;
        if (!res.correct) this.wrongLetters.unshift(letter);
        this.current = '';

        if (this.lives === 0) this.gameOver = 'lose';
        else if (!this.state!.masked.includes('_')) this.gameOver = 'win';
      });
  }
}
