import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [RouterModule, NgIf],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent {
  constructor(private router: Router) {}
  goCpu()    { this.router.navigate(['/cpu']); }
  goLocal()  { this.router.navigate(['/local']); }
  goOnline() { this.router.navigate(['/online']); }
}
