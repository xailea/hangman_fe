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

  constructor(private router: Router) {}

  goCpu() {
    this.router.navigate(['/cpu']);
  }
  goLocal() {
    this.router.navigate(['/local']);
  }
  goOnline() {
    this.router.navigate(['/online']);
  }
}
