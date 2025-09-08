import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { GameService, StartResp } from '../../services/game.service';

@Component({
  selector: 'app-cpu-game',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cpu-game.component.html',
  styleUrls: ['./cpu-game.component.scss']
})
export class CpuGameComponent implements OnInit {
  playerName = 'Player';
  level: 'easy'|'medium'|'hard'|'extreme' = 'easy';
  state: StartResp | null = null;

  constructor(private route: ActivatedRoute, private api: GameService) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(p => {
      this.level = (p['level'] ?? 'easy') as any;
      this.playerName = (p['name'] ?? 'Player').toString();
      this.api.start(this.level).subscribe(r => this.state = r);
    });
  }
}
