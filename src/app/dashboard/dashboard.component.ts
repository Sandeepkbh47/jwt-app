import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DashService } from '../dash.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  stats$: Observable<any> | undefined;
  stats = [];
  constructor(private dashService: DashService) {}

  ngOnInit() {
    this.stats$ = this.dashService.getStats();
    this.stats$.subscribe((data) => {
      this.stats = data;
    });
  }
}
