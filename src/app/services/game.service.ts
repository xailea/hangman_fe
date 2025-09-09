import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

export interface StartResp {
  level: string; seed: string; len: number;
  masked: string; revealed: string; positions: number[]; lives: number;
}
export interface GuessResp {
  masked: string; positions: number[]; correct: boolean; lives: number;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private base = (environment.apiBase ? `${environment.apiBase}` : '') + '/api/game';
  constructor(private http: HttpClient) {}

  start(level: 'easy'|'medium'|'hard'|'extreme', seed?: string){
    let params = new HttpParams().set('level', level);
    if (seed) params = params.set('seed', seed);   // ← forza nuova parola
    return this.http.get<StartResp>(`${this.base}/start`, { params });
  }

  guess(level: string, seed: string, masked: string, letter: string, lives: number){
    return this.http.post<GuessResp>(`${this.base}/guess`, { level, seed, masked, letter, lives });
  }
}
