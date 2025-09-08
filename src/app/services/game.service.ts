import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

export interface StartResp {
  level: string; seed: string; len: number;
  masked: string; revealed: string; positions: number[]; lives: number;
}

@Injectable({ providedIn: 'root' })
export class GameService {
  private base = '/api/game';
  constructor(private http: HttpClient) {}
  start(level: 'easy'|'medium'|'hard'|'extreme'){
    const params = new HttpParams().set('level', level);
    return this.http.get<StartResp>(`${this.base}/start`, { params });
  }
}
