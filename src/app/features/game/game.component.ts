import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Difficulty } from '../../models/difficulty';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-game',
  imports: [AsyncPipe, NgIf],
  template: `
    <section class="wrap">
      <h2>Hangman vs CPU</h2>
      <p *ngIf="level as l">Difficoltà: <strong>{{ l }}</strong></p>
      <!-- Qui monterai la board di gioco -->
    </section>
  `,
  styles: [`.wrap{max-width:920px;margin:64px auto;padding:0 16px;color:#d6d7e0}`],
})
export class GameComponent {
  level: Difficulty | null = null;
  constructor(route: ActivatedRoute) {
    const l = (route.snapshot.queryParamMap.get('level') as Difficulty) || null;
    this.level = l;
  }
}
