import { AfterViewInit, Component, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type Phase = 'names' | 'p1Word' | 'p2Guess' | 'p2Word' | 'p1Guess' | 'result';

@Component({
  selector: 'app-locale',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './locale.component.html',
  styleUrls: ['./locale.component.scss']
})
export class LocaleComponent implements AfterViewInit {

  @ViewChildren('letterInput') letterInputs!: QueryList<ElementRef<HTMLInputElement>>;

  ngAfterViewInit() {
    this.letterInputs.changes.subscribe(() => this.focusLetter());
    this.focusLetter();
  }
  private focusLetter() {
    const el = this.letterInputs?.last?.nativeElement;
    if (el) setTimeout(() => el.focus(), 0);
  }

  phase: Phase = 'names';

  p1 = { name: '', word: '', mistakes: 0 };
  p2 = { name: '', word: '', mistakes: 0 };

  guesser = '';
  secret = '';
  masked = '';
  guessed = new Set<string>();
  wrongLetters: string[] = [];
  lives = 6;
  dots = Array.from({ length: 6 });
  parts = 0;
  current = '';

  level = 'Locale';
  get gameOver(): 'win' | 'lose' | null {
    if (this.lives <= 0) return 'lose';
    if (this.masked && !this.masked.includes('_')) return 'win';
    return null;
  }

  back() { history.back(); }

  startP1Word() {
    if (!this.p1.name.trim() || !this.p2.name.trim()) return;
    this.phase = 'p1Word';
    this.resetEntry();
  }

  confirmWordFromP1() {
    if (!this.p1.word.trim()) return;
    this.startRound(this.p1.word, this.p2.name);
    this.phase = 'p2Guess';
  }

  confirmWordFromP2() {
    if (!this.p2.word.trim()) return;
    this.startRound(this.p2.word, this.p1.name);
    this.phase = 'p1Guess';
  }

  private startRound(secret: string, guesser: string) {
    this.secret = this.normalize(secret);
    this.guesser = guesser;
    this.guessed = new Set();
    this.wrongLetters = [];
    this.lives = 6;
    this.parts = 0;
    this.masked = this.mask(this.secret, this.guessed);
    this.current = '';
  }

  onInput(e: Event) {
    const v = (e.target as HTMLInputElement).value.toUpperCase().replace(/[^A-ZÀ-ÖØ-Ý]/g, '');
    this.current = v.slice(0, 1);
  }
  filter(e: KeyboardEvent) {
    if (e.key.length === 1 && !/[A-Za-zÀ-ÖØ-öø-ÿ]/.test(e.key)) e.preventDefault();
  }

  submit() {
    const ch = this.current.toUpperCase();
    if (!ch || this.guessed.has(ch)) return;

    this.guessed.add(ch);

    if (this.secret.includes(ch)) {
      this.masked = this.mask(this.secret, this.guessed);
    } else {
      this.wrongLetters.push(ch);
      this.lives--;
      this.parts = 6 - this.lives;
    }

    this.current = '';

    const over = this.gameOver;
    if (over) { this.finishRound(over); return; }
    this.focusLetter();
  }

  finishRound(outcome: 'win' | 'lose') {
    const mistakes = this.wrongLetters.length;
    if (this.phase === 'p2Guess') {
      this.p2.mistakes = mistakes;
      this.phase = 'p2Word';
      this.resetEntry();
    } else if (this.phase === 'p1Guess') {
      this.p1.mistakes = mistakes;
      this.phase = 'result';
    }
  }

  restartMatch() {
    this.phase = 'names';
    this.p1 = { name: '', word: '', mistakes: 0 };
    this.p2 = { name: '', word: '', mistakes: 0 };
    this.resetRound();
  }

  restartRound() {
    if (this.phase === 'p2Guess') this.phase = 'p1Word';
    else if (this.phase === 'p1Guess') this.phase = 'p2Word';
    this.resetEntry();
    this.resetRound();
  }

  resetEntry() {
    if (this.phase === 'p1Word') this.p1.word = '';
    if (this.phase === 'p2Word') this.p2.word = '';
  }
  resetRound() {
    this.secret = '';
    this.masked = '';
    this.guessed.clear();
    this.wrongLetters = [];
    this.lives = 6;
    this.parts = 0;
    this.current = '';
  }

  private normalize(w: string) {
    return w.toUpperCase().replace(/\s+/g, ' ').trim();
  }
  private mask(secret: string, guessed: Set<string>) {
    return secret.split('')
      .map(ch => /[A-ZÀ-ÖØ-Ý]/.test(ch) ? (guessed.has(ch) ? ch : '_') : ch)
      .join('');
  }
}
