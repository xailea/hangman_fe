import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Difficulty } from '../../models/difficulty';

type Pack = { words: string[]; seed: string };

@Injectable({ providedIn: 'root' })
export class WordService {
  private cache = new Map<Difficulty, string[]>();
  private threshold = 8;

  constructor(private http: HttpClient) {}

  async prefetch(level: Difficulty, n = 32): Promise<void> {
    const buf = this.cache.get(level) ?? [];
    if (buf.length >= n) return;

    const need = n - buf.length;
    try {
      const pack = await firstValueFrom(
        this.http.get<Pack>(`/api/words`, { params: { level, n: Math.max(need, 16) } as any })
      );
      const toAdd = pack?.words ?? [];
      if (toAdd.length) this.cache.set(level, buf.concat(toAdd));
    } catch {
      const toAdd = this.pickFallback(level, need);
      this.cache.set(level, buf.concat(toAdd));
    }
  }

  next(level: Difficulty): string {
    const buf = this.cache.get(level) ?? [];
    if (buf.length === 0) {
      const w = this.pickFallback(level, 1)[0];
      // avvia prefetch in background
      this.prefetch(level).catch(() => {});
      return w;
    }
    const w = buf.shift()!;
    this.cache.set(level, buf);
    if (buf.length < this.threshold) this.prefetch(level).catch(() => {});
    return w;
  }

  private pickFallback(level: Difficulty, n: number): string[] {
    const dict: Record<Difficulty, string[]> = {
      easy:    ['CANE','GATTO','CASA','SOLE','LUNA','MARE','PANE','LIBRO','PORTA','FIORE'],
      medium:  ['SCARPA','STELLA','BICICLETTA','TASTIERA','QUADERNO','VALIGIA','AEROPORTO','CAMICIA','PENSILE','GIOSTRA'],
      hard:    ['ASTRONAVE','TELEFERICA','LABIRINTO','CARBONARA','SCHELETRO','GIRANDOLA','GELSOMINO','FALCIATRICE','METROPOLI','CASCATELLA'],
      extreme: ['PSICOLOGIA','SBADIGLIO','SPREZZANTE','SQUARCIARE','SFINGE','SBIADIRE','IPOTESI','SFERAARMILLARE','SPRIGIONO','STRAZIANTE']
    };
    const base = dict[level].slice();
    for (let i = base.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [base[i], base[j]] = [base[j], base[i]];
    }
    return base.slice(0, n);
  }
}
