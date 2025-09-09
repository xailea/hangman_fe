import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  name = '';

  constructor(private router: Router) {}

  goCpu() {
    const n = (this.name || 'Player').trim();
    this.router.navigate(['/cpu'], { queryParams: { name: n } });
  }
  goLocal() {
    const n = (this.name || 'Player').trim();
    this.router.navigate(['/local'], { queryParams: { name: n } });
  }
  goOnline() {
    const n = (this.name || 'Player').trim();
    this.router.navigate(['/online'], { queryParams: { name: n } });
  }
}
